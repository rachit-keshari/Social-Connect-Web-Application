import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(private loginService: LoginService){}

intercept(
  req: HttpRequest<any>,
  next: HttpHandler
  ): Observable<HttpEvent<any>> {

    console.log("inside interceptor");
    //add the jwt token (local Storage) request
    const check1="www.googleapis.com/youtube/v3/";
    const check2="www.youtube.com/embed/";
    const check3="api.covid19api.com/";
    const check4="googleusercontent.com/";
    let authReq = req;
    const token = this.loginService.getToken();
    if(token!=null && req.url.search(check1)===-1 && req.url.search(check2)===-1 &&
    req.url.search(check3)===-1)
    {
        authReq = authReq.clone({
          setHeaders:{Authorization:`Bearer ${token}`}
      });
    }
    return next.handle(authReq);
  }

}
export const authInterceptorProviders = [
  {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptor,
       multi:true,
  },
]
