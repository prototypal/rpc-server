import Controller from "../controller";
import { JsonRpc, Rpc } from "../types";

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
    parameters: payload.params
  };
}
