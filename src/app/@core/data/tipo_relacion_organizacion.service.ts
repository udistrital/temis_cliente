import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { GENERAL } from './../../app-config';
import { catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + window.localStorage.getItem('access_token')
    //'Authorization': 'JWT ' + window.localStorage.getItem('id_token')
  }),
}

const path = GENERAL.ENTORNO.TIPO_RELACION_ORGANIZACION_SERVICE;

@Injectable()
export class TipoRelacionOrganizacionService {

  private user$ = new Subject<[object]>();
  public user: any;

  constructor(private http: HttpClient) {
    if (window.localStorage.getItem('id_token') !== null && window.localStorage.getItem('id_token') !== undefined) {
      const id_token = window.localStorage.getItem('id_token').split('.');
      const payload = JSON.parse(atob(id_token[1]));
      window.localStorage.setItem('usuario', payload.sub);
      this.http.get(path + 'persona/?query=Usuario:' + payload.sub, httpOptions)
        .subscribe(res => {
          if (res !== null) {
            this.user = res[0];
            this.user$.next(this.user);
            window.localStorage.setItem('ente', res[0].Ente);
          }
        });
    }
  }

  get(endpoint) {
    return this.http.get(path + endpoint)
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

  delete(endpoint, element) {
    return this.http.delete(path + endpoint + '/' + element.Id, httpOptions).pipe(
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
