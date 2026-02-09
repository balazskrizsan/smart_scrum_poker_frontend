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

    /**
     * Creates URLSearchParams instead of HttpParams
     * URLSearchParams is a native browser API, no Angular dependency needed
     */
    public static createHttpParams(rawData: {}): URLSearchParams {
        rawData = HttpHelperService.paramCleaner(rawData);
        const params = new URLSearchParams();

        Object.keys(rawData).forEach(
          (key: string) => {
              const valueOrObject = rawData[key];

              if ('object' === typeof valueOrObject) {
                  Object.keys(valueOrObject).forEach(
                    (subKey) => {
                        params.append(key, valueOrObject[subKey]);
                    }
                  );

                  return;
              }

              params.append(key, valueOrObject);
          }
        );

        return params;
    }

    /**
     * Alternative: Create a plain object for query params
     * This works with fetch() or any HTTP library
     */
    public static createParamsObject(rawData: {}): Record<string, string | string[]> {
        rawData = HttpHelperService.paramCleaner(rawData);
        const params: Record<string, string | string[]> = {};

        Object.keys(rawData).forEach(
          (key: string) => {
              const valueOrObject = rawData[key];

              if ('object' === typeof valueOrObject) {
                  const values: string[] = [];
                  Object.keys(valueOrObject).forEach(
                    (subKey) => {
                        values.push(valueOrObject[subKey]);
                    }
                  );
                  params[key] = values;

                  return;
              }

              params[key] = valueOrObject;
          }
        );

        return params;
    }

    /**
     * Helper to convert params object to query string
     * Example: {name: 'John', age: 30} => "name=John&age=30"
     */
    public static toQueryString(params: Record<string, any>): string {
        const searchParams = new URLSearchParams();

        Object.keys(params).forEach(key => {
            const value = params[key];
            if (Array.isArray(value)) {
                value.forEach(v => searchParams.append(key, v));
            } else {
                searchParams.append(key, value);
            }
        });

        return searchParams.toString();
    }
}
