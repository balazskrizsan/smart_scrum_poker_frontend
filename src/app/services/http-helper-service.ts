import {HttpParams} from '@angular/common/http';

export class HttpHelperService {
  public static paramCleaner(rawData: any): {} {
    const cleanData = {};

    Object.keys(rawData).forEach(
      (key: string) => {
        const valueOrObject = rawData[key];

        if ('undefined' === typeof valueOrObject || null === valueOrObject) {
          return;
        }

        if ('boolean' === typeof valueOrObject) {
          cleanData[key] = valueOrObject ? 1 : 0;

          return;
        }
        if (valueOrObject instanceof File) {
          cleanData[key] = valueOrObject;

          return;
        }

        if ('object' === typeof valueOrObject) {
          cleanData[key] = HttpHelperService.paramCleaner(valueOrObject);

          return;
        }

        cleanData[key] = valueOrObject;
      }
    );

    return cleanData;
  }

  public static createFormData(rawData: {}): FormData {
    rawData = HttpHelperService.paramCleaner(rawData);
    const params = new FormData();

    Object.keys(rawData).forEach(
      (key: string) => {
        const valueOrObject = rawData[key];

        if (valueOrObject instanceof File) {
          params.append(key, valueOrObject, 'a.jpg');

          return;
        }

        params.append(key, typeof valueOrObject === 'object' ? JSON.stringify(valueOrObject) : valueOrObject);
      }
    );

    return params;
  }

  public static createHttpParams(rawData: {}): HttpParams {
    rawData = HttpHelperService.paramCleaner(rawData);
    let params = new HttpParams();

    Object.keys(rawData).forEach(
      (key: string) => {
        const valueOrObject = rawData[key];

        if ('object' === typeof valueOrObject) {
          Object.keys(valueOrObject).forEach(
            (subKey) => {
              params = params.append(key, valueOrObject[subKey]);
            }
          );

          return;
        }

        params = params.append(key, valueOrObject);
      }
    );

    return params;
  }
}
