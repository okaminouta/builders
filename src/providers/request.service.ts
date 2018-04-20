import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs';
import {ApiService} from './request.interface';
import * as queryString from 'query-string';
import {catchError, tap} from "rxjs/operators";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

@Injectable()

export class RequestProvider implements ApiService {


    constructor(public http: HttpClient) {
    }



    /**
     *
     * @param url
     * @param credentials
     * @param options
     * @returns {Observable<ArrayBuffer>}
     */
    public post(url: string, credentials: any) {
        return this.http.post(url, credentials)
          .pipe(
            catchError(this.handleError)
          )
    }

    /**
     *
     * @param url
     * @param body
     * @returns {Observable<ArrayBuffer>}
     */
    public get(url: string, body: Object = null) {
        if (body !== null) {
            if (Object.keys(body).length > 0) {
                url += '?' + queryString.stringify(body);
            }
        }
        return this.http.get(url)
          .pipe(
            catchError(this.handleError)
          )
    }

    /**
     *
     * @param url
     * @param credentials
     * @param options
     * @returns {Promise<ArrayBuffer>|Promise<TResult|ArrayBuffer>}
     */
    public put(url: string, credentials: any):Observable<any> {
        return this.http.put(url, credentials)
          .pipe(
            catchError(this.handleError)
          )
    }

    /**
     * DELETE is reserved, I'm using destroy
     * @param url
     * @param options
     * @returns {Promise<ArrayBuffer>|Promise<TResult|ArrayBuffer>}
     */
    public destroy(url: string) {
        return this.http.delete(url)
          .pipe(
            catchError(this.handleError)
          )
    }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      error);
  };
}
