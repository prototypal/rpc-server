import Controller from "./controller";
import { JsonRpc, JsonApiOperation } from "./types";

const isJsonApi = (rpc: any) => rpc.op && rpc.ref && rpc.ref.type && rpc.data && rpc.data.attributes;
const isJsonRpc = (rpc: any) => rpc.jsonrpc && rpc.method && rpc.params;

export default class Router {
  protected controllers: Array<typeof Controller>;

  constructor({ controllers }: { controllers: Array<typeof Controller> }) {
    this.controllers = controllers;
  }

  async dispatch(rpc: JsonApiOperation | JsonRpc) {
    if (isJsonApi(rpc)) {
      return this.dispatchJsonApi(rpc as JsonApiOperation);
    }

    if (isJsonRpc(rpc)) {
      return this.dispatchJsonRpc(rpc as JsonRpc);
    }
  }

  protected async dispatchJsonApi(op: JsonApiOperation) {
    const resolver = Object.values(Controller.rpcMethods.jsonapi).find(
      ({ method, type }) => method === op.op && type.jsonapiType === op.ref.type
    );

    if (!resolver) {
      console.error("Cannot resolve call", op, Controller.rpcMethods.jsonapi);
    }

    const ControllerClass = resolver.type;
    const controller = new ControllerClass();

    return controller[resolver.callback](op);
  }

  protected async dispatchJsonRpc(rpc: JsonRpc) {
    const resolver = Object.values(Controller.rpcMethods.jsonrpc).find(({ method }) => method === rpc.method);
    const ControllerClass = resolver.type;
    const controller = new ControllerClass();

    return controller[resolver.callback](rpc.params);
  }
}
