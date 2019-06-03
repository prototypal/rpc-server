import Controller from "./controller";

export type MethodRouteMap = {
  [key: string]: { method: string; callback: string; type: typeof Controller };
};

export type RpcParameters =
  | {
      [key: string]: any;
    }
  | any[];

export type JsonApiOperation = {
  op: string;
  data?: any;
  included?: any[];
  ref: {
    type: string;
    id?: string | undefined;
    lid?: string;
    relationship?: string;
  };
  params?: any;
  links?: any;
  meta?: any;
};

export type JsonRpc = {
  jsonrpc: string;
  method: string;
  params: RpcParameters;
  id: number;
};

export type Rpc = {
  methodName: string;
  parameters: RpcParameters;
};
