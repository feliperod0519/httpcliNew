import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationServiceService } from '../app/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationServiceService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {          
          this.authenticationService.logout();
          location.reload(true);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
  }))
  }
}
