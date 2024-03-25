import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {IResponseEntity} from '../interfaces/i-response-entity';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }

  static handleSuccess(response): any {
    const result = {
      data: null,
      errorData: null,
      success: true,
      errorCode: 0,
      statusCode: 200,
    };

    try {
      result.data = response.body.data || null;
      result.statusCode = response.status;
    } catch {
      console.error('Response parser error.', response);
      result.success = false;
      result.errorCode = 2;
      result.statusCode = 500;
    }

    return result;
  }

  static handleError(response: HttpErrorResponse): any {
    const result = {
      data: null,
      errorData: null,
      success: false,
      errorCode: 1,
      statusCode: 200,
    };

    try {
      result.errorData = response.error.data;
      result.errorCode = response.error.errorCode;
      result.statusCode = response.status;
      console.error('Bad response.', response);
    } catch {
      console.error('Response parser error.', response);
      result.success = false;
      result.errorCode = 2;
      result.statusCode = 500;
    }

    return of(result);
  }

  public post<T>(url: string, data: FormData): Observable<IResponseEntity<T>> {
    const defaultOptions = {
      withCredentials: true,
      observe: 'response'
    };

    return this.http.post(url, data, defaultOptions as any)
      .pipe(map(HttpService.handleSuccess))
      .pipe(catchError(HttpService.handleError));
  }

  public get<T>(url: string, httpParams?: HttpParams): Observable<IResponseEntity<T>> {
    const defaultOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}),
      withCredentials: true,
      observe: 'response',
      params: httpParams
    };

    return this.http.get(url, defaultOptions as any)
      .pipe(map(HttpService.handleSuccess))
      .pipe(catchError(HttpService.handleError));
  }

  public getBySdk<T>(url: string, httpParams?: HttpParams): Observable<T> {
    const defaultOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}),
      withCredentials: true,
      observe: 'response',
      params: httpParams
    };

    return this.http.get(url, defaultOptions as any)
      .pipe(map(HttpService.handleSuccess))
      .pipe(catchError(HttpService.handleError));
  }

  public postBySdk<T>(url: string, httpParams?: HttpParams): Observable<T> {
    const defaultOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}),
      withCredentials: true,
      observe: 'response',
      params: httpParams
    };

    return this.http.post(url, defaultOptions as any)
      .pipe(map(HttpService.handleSuccess))
      .pipe(catchError(HttpService.handleError));
  }

  public delete<T>(url: string, httpParams?: HttpParams): Observable<IResponseEntity<T>> {
    const defaultOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}),
      withCredentials: true,
      observe: 'response',
      params: httpParams
    };

    return this.http.delete(url, defaultOptions as any)
      .pipe(map(HttpService.handleSuccess))
      .pipe(catchError(HttpService.handleError));
  }
}
