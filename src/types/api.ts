export type Endpoint<RequestType = object, ResponseType = Record<string, unknown>> = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
  response: ResponseType;
  requestData?: RequestType;
};
