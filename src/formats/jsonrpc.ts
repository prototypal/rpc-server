import Controller from "../controller";

export function jsonRpcMethod(name: string) {
  return (target: Controller, propertyKey: string) => {
    const constructor = <typeof Controller>target.constructor;
    constructor.rpcMethods.jsonrpc[`${constructor.name}_${name}`] = {
      method: name,
      callback: propertyKey,
      type: constructor
    };
  };
}
