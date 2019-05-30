export type MethodRouteMap = {
  [key: string]: string;
};

export type RpcParameters = {
  [key: string]: string | string[] | number | number[] | boolean | boolean[] | RpcParameters;
};

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
