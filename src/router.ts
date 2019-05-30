import Controller from "./controller";
import Rpc from "./rpc";

export default class Router {
  protected controllers: Array<typeof Controller>;

  constructor({ controllers }: { controllers: Array<typeof Controller> }) {
    this.controllers = controllers;
  }

  async dispatch(rpc: Rpc) {
    const ControllerClass = this.getControllerFor(rpc.methodName);
    const controller = new ControllerClass();

    return controller[ControllerClass.rpcMethods[rpc.methodName]](rpc.parameters);
  }

  getControllerFor(methodName: string) {
    return this.controllers.find(controller => methodName in controller.rpcMethods);
  }
}
