import Controller from "../controller";

export function jsonApiType(name: string) {
  return (target: typeof Controller) => {
    target.jsonapiType = name;
  };
}

export function jsonApiOperation(name: string) {
  return (target: Controller, propertyKey: string) => {
    const constructor = <typeof Controller>target.constructor;
    constructor.rpcMethods.jsonapi[`${constructor.name}_${name}`] = {
      method: name,
      callback: propertyKey,
      type: constructor
    };
  };
}
