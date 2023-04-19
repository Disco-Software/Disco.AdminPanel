export type Method =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "CONNECT"
  | "TRACE"
  | "OPTIONS";

export type AppType = "CSR" | "WSC" | "OP" | "PP";

export interface Swagger {
  path: string;
  method: string;
  appType: AppType[] | string;
  deprecated: boolean;
  parameters?: any[];
  withMock?: boolean;
}

export interface DecoratorValue {
  key: string;
  parameterIndex: number;
}
