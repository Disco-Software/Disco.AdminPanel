import { HttpHeaders, HttpParams } from "@angular/common/http";
import { eHTTP } from "./http";

export namespace Rest{
  export interface IRequest<T = null> {
    body?: T;
    headers?: HttpHeaders | {[header: string] : string | string[]};
    method: | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "CONNECT"
    | "TRACE"
    | "OPTIONS";
    params?:
      | HttpParams
      | {
          [param: string]: string | number | boolean | any[];
        };
    reportProgress?: boolean;
    responseType?: eHTTP.ResponseType;
    url: string;
    withCredentials?: boolean;
    withCache?: CacheConfig;
  }

  export interface Config {
    desc: string;
    endpoint?: string;
    skipError?: boolean;
  }

  export interface CacheConfig {
    cacheEnabled: boolean;
    ttl?: number; // example 60000; 1 minute cache
    cacheId?: string;
  }
}
