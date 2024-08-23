import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, tap, map, of, EMPTY } from 'rxjs';
import { CacheService } from '../services/cache.service';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: CacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.cacheService.allowCache(request)) {
      const cachedResponse = this.cacheService.getDataFromCache(request);
      return cachedResponse ? of(cachedResponse) : this.getDataFromServer(request, next);
    }
    return this.getDataFromServer(request, next);
  }

  getDataFromServer(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((response) => {
        this.cacheService.allowCache(request)
          ? this.cacheService.saveDataToCache(
            request,
            <HttpResponse<unknown>>response
          )
          : EMPTY
      })
    );
  }
}
