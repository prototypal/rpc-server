import { MethodRouteMap } from "./types";

export default class Controller {
  static jsonapiType: string;
  static rpcMethods: MethodRouteMap = {
    jsonapi: {},
    jsonrpc: {}
  };
}
