import Controller from "../controller";
import { JsonRpc, Rpc, JsonRpcResponse } from "../types";

export function jsonRpcMethod(name: string) {
  return (target: Controller, propertyKey: string) => {
    const constructor = <typeof Controller>target.constructor;
    constructor.rpcMethods[`${constructor.name}:${name}`] = {
      method: name,
      callback: propertyKey,
      type: constructor
    };
  };
}

export function jsonRpcDeserialize(payload: JsonRpc): Rpc {
  return {
    methodName: payload.method,
    parameters: payload.params,
    id: payload.id
  };
}

export function jsonRpcSerializeAsResponse(result: any, id: number): JsonRpcResponse {
  return {
    jsonrpc: "2.0",
    result,
    id
  };
}
