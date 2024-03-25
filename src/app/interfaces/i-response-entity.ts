export interface IResponseEntity<T> {
  data?: T;
  errorData?: any;
  success: boolean;
  errorCode: number;
  statusCode: number;
}

