import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GENERAL } from './../../app-config';
import { catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    //'Authorization': 'Bearer ' + window.localStorage.getItem('access_token')
    'Authorization': 'JWT ' + window.localStorage.getItem('id_token')
  }),
}

const path = GENERAL.ENTORNO.MONTO_ACEPTADO_POR_COBRAR_SERVICE;

@Injectable()
export class MontoAceptadoService {

  private user$ = new Subject<[object]>();
  public user: any;

  constructor(private http: HttpClient) { }

  get(endpoint) {
    return this.http.get(path + endpoint, httpOptions)
  }

  post(endpoint, element) {
    return this.http.post(path + endpoint, element, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  put(endpoint, element) {
    return this.http.put(path + endpoint + '/' + element.Id, element, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  delete(endpoint, id) {
    return this.http.delete(path + endpoint + '/' + id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
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
    // return an observable with a user-facing error message
    return throwError({
      status: error.status,
      message: 'Something bad happened; please try again later.',
    });
  };
}
