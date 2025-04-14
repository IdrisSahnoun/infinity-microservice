import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interceptor to handle API requests for statistics
 * Ensures requests go through the gateway with proper headers
 */
@Injectable()
export class StatsApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if the request is for statistics API
    if (request.url.includes('/api/statistiques')) {
      console.log('StatsApiInterceptor: Intercepting statistics API request', request.url);
      
      // Clone the request and add headers
      const modifiedRequest = request.clone({
        headers: request.headers
          .set('Accept', 'application/json')
          .set('X-Requested-With', 'XMLHttpRequest')
      });
      
      return next.handle(modifiedRequest);
    }
    
    // Pass through all other requests unchanged
    return next.handle(request);
  }
} 