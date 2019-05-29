import Controller from "../controller";

export default function rpcMethod(name: string) {
  return (target: Controller, propertyKey: string) => {
    (<typeof Controller>target.constructor).rpcMethods[name] = propertyKey;
  };
}
