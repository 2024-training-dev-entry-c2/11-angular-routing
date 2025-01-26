import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  private baseUrl: string = 'http://localhost:8080/api'; 

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url.startsWith('http') ? req.url : `${this.baseUrl}${req.url}`;
    const clonedRequest = req.clone({
      url,
      setHeaders: {
        'Content-Type': 'application/json' 
      }
    });

    return next.handle(clonedRequest);
  }
}