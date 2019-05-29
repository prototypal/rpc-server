import Controller from "./controller";

export default class Router {
  protected controllers: Array<typeof Controller>;

  constructor({ controllers }: { controllers: Array<typeof Controller> }) {
    this.controllers = controllers;
  }

  async dispatch(methodName: string, parameters: any[]) {
    const ControllerClass = this.getControllerFor(methodName);
    const controller = new ControllerClass();

    return controller[ControllerClass.rpcMethods[methodName]](...parameters);
  }

  getControllerFor(methodName: string) {
    return this.controllers.find(controller => methodName in controller.rpcMethods);
  }
}
