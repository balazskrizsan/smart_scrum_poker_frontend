import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IResponseEntity } from '../interfaces/i-response-entity';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private static handleSuccess(response: any): any {
    return {
      data: response?.data ?? null,
      errorData: null,
      success: true,
      errorCode: 0,
      statusCode: 200,
    };
  }

  private static handleError(error: any): any {
    console.error('Bad response.', error);

    return of({
      data: null,
      errorData: error,
      success: false,
      errorCode: 1,
      statusCode: 500,
    });
  }

  // ✅ POST FormData
  post<T>(url: string, data: FormData): Observable<IResponseEntity<T>> {
    return from(
      fetch(url, {
        method: 'POST',
        body: data,
        credentials: 'include'
      }).then(res => res.json())
    ).pipe(
      map(HttpService.handleSuccess),
      catchError(HttpService.handleError)
    );
  }

  // ✅ GET query params
  get<T>(url: string, params?: URLSearchParams): Observable<IResponseEntity<T>> {

    let finalUrl = url;

    if (params) {
      const query = params.toString();
      finalUrl += `?${query}`;
    }

    return from(
      fetch(finalUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => res.json())
    ).pipe(
      map(HttpService.handleSuccess),
      catchError(HttpService.handleError)
    );
  }

  // ✅ DELETE
  delete<T>(url: string): Observable<IResponseEntity<T>> {
    return from(
      fetch(url, {
        method: 'DELETE',
        credentials: 'include'
      }).then(res => res.json())
    ).pipe(
      map(HttpService.handleSuccess),
      catchError(HttpService.handleError)
    );
  }
}
