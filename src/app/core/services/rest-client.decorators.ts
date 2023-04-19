import { eHTTP } from "../../enums";
import { RestService } from "../rest.service";
import { restClientParameterBuilder } from "./rest-client.helpers";
import { AppType } from "./rest-client.symbols";

export const Body = restClientParameterBuilder("Body")("Body");
export const Desc = restClientParameterBuilder("Desc")("Desc");
export const Query = restClientParameterBuilder("Query");
export const QueryMap = restClientParameterBuilder("QueryMap")("QueryMap");
export const Path = restClientParameterBuilder("Path");
export const Params = restClientParameterBuilder("Params");
export const ParamsMap = restClientParameterBuilder("ParamsMap")("ParamsMap");
export const WithCache = restClientParameterBuilder("WithCache")("WithCache");

/**
 * Custom header of a REST method, type: string
 * @param {string} key - header key to bind value
 */
export const Header = restClientParameterBuilder("Header");

export function WithCredentials() {
  return function (target: RestService, propertyKey: string, descriptor: any) {
    descriptor.withCredentials = true;
    return descriptor;
  };
}

/**
 * Set custom headers for a REST method
 * @param {Object} headers - custom headers in a key-value pair
 */
export function Headers(headers: { [name: string]: string | string[] }) {
  return function (target: RestService, propertyKey: string, descriptor: any) {
    descriptor.headers = headers;
    return descriptor;
  };
}

export function ResponseType(responseType: eHTTP.ResponseType) {
  return function (target: RestService, propertyKey: string, descriptor: any) {
    descriptor.responseType = responseType;
    return descriptor;
  };
}

export function App(app: AppType | AppType[]) {
  return function (target: RestService, propertyKey: string, descriptor: any) {
    descriptor.appType = app ? (Array.isArray(app) ? app : [app]) : [];
    return descriptor;
  };
}

export function Mock(data: any) {
  return function (target: RestService, propertyKey: string, descriptor: any) {
    let _descriptor: any;

    if (isNaN(descriptor)) {
      descriptor.mockData = data;
      _descriptor = descriptor;
    } else {
      target[propertyKey].mockData = data;
      _descriptor = target[propertyKey];
    }

    return _descriptor;
  };
}

export function Deprecated() {
  return function (target: RestService, propertyKey: string, descriptor: any) {
    descriptor.deprecated = true;
    return descriptor;
  };
}
