import Controller from "../controller";

export function jsonApiType(name: string) {
  return (target: typeof Controller) => {
    target.jsonapiType = name;
    const functions = Object.getOwnPropertyNames(target.prototype).filter(func => func !== "constructor");

    functions.forEach(method => {
      jsonApiOperation(method, target)(target.prototype, method);
    });
  };
}

export function jsonApiOperation(name: string, forcedConstructor?: typeof Controller) {
  return (target: Controller, propertyKey: string) => {
    const constructor = forcedConstructor || <typeof Controller>target.constructor;
    constructor.rpcMethods.jsonapi[`${constructor.name}_${name}`] = {
      method: name,
      callback: propertyKey,
      type: constructor
    };
  };
}
