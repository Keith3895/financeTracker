import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { LoginService } from '../login.service';
// import { Observable } from 'rxjs/Observable';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
@Injectable()
export class InterceptorService implements HttpInterceptor {
  timeout = 90000;
  constructor(public auth: LoginService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `JWT ${this.auth.loadToken()}`
      }
    });
    return next.handle(request)
      .timeout(this.timeout)
      .catch(error => this.onCatch(error, request, next))
      .finally(() => {
        this.onFinally();
      });
  }
  /**
    * Error handler.
    * @param error
    * @param caught
    * @returns {ErrorObservable}
    */
  private onCatch(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    console.log(error)
    if (error instanceof HttpErrorResponse) {
      if ((<HttpErrorResponse>error).status === 403 && (<HttpErrorResponse>error).error.message === 'jwt expired') {
        console.log('jwt expired');
      } else {
        return this.onSubscribeError(error);
      }
    } else {
      return this.onSubscribeError(error);
    }
  }

  /**
   * onSubscribeError
   * @param error
   */
  private onSubscribeError(err: HttpErrorResponse): Observable<any> {
    // this.bHTTPLoader.alertError(err);
    return this.onCatchError(err);
  }
  /**
   * onFinally
   */
  private onFinally(): void {
    this.responseInterceptor();
  }

  private onCatchError(error: HttpErrorResponse): Observable<any> {
    return Observable.throw(error);
  }
  private responseInterceptor(): void {
    // this.bHTTPLoader.isHTTPRequestInProgress(false);
  }
}