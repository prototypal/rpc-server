import { JsonApiOperation, JsonRpc } from "./types";
import Router from "./router";

export default class Rpc {
  constructor(public methodName: string, public parameters: object) {
    this.methodName = methodName;
    this.parameters = parameters;
  }

  async dispatchFrom(router: Router) {
    return router.dispatch(this);
  }

  static fromJsonApiOperation(op: JsonApiOperation) {
    return new Rpc(`${op.ref.type}_${op.op}`, {
      id: op.ref.id,
      ...op.data.attributes
    });
  }

  static fromJsonRpc(rpc: JsonRpc) {
    return new Rpc(rpc.method, rpc.params);
  }
}
