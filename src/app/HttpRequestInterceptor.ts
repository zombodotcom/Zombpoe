import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from "@angular/common/http";

import { Observable } from "rxjs";

/** Inject With Credentials into the request */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders({
      Authorization: "token 123",
      "WEB-API-key": "hello",
      "Content-Type": "application/json"
      // cookie: "POESESSID=insert"
    });
    req = req.clone({
      withCredentials: true,
      headers
    });

    return next.handle(req);
  }
}
