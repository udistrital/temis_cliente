import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';

import {  tap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const acces_token = window.localStorage.getItem('access_token');

    

    if (acces_token) {
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authToken = 'Bearer ' + acces_token;

    console.log(req.headers.set('Authorization', authToken))
    
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken),
    });

    console.log("authReq: ", authReq)

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
        tap(event => {
          console.log("event: ", event)
          // There may be other events besides the response.
          if (event instanceof HttpErrorResponse) {
            // cache.put(req, event); // Update the cache.
            this.router.navigate(['/']);
          }
        },
        (error: any) => {
            console.info(error);
        },
      ));
    } else {
      return next.handle(req);
    }
  }
}
