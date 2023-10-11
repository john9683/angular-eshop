import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, tap, map, of, EMPTY } from 'rxjs';
import { CacheService } from '../services/cache.service';

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: CacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // // *** по видео из урока ***
    // if(request.url.indexOf('products') !== -1) {... какие-либ действия }
    // // *****************************************************************
    // console.log(request);
    // return next.handle(request);
    // // *****************************************************************
    // return next
    // .handle(request)
    // .pipe(tap((event: HttpEvent<any>) => console.log(event)))
    // // *****************************************************************
    // return next.handle(request).pipe(
    //   map((event: HttpEvent<any>) => {
    //     if(event instanceof HttpResponse){
    //       const body = {
    //         ...event.body,
    //         data: event.body.items.map((product) => {
    //           const newProduct = {
    //             ...product,
    //             price: Math.ceil(product.price / 1000 ),
    //                 }
    //                 console.log(newProduct)
    //               return newProduct
    //             }),
    //           }
    //         return event.clone({body})
    //       }
    //       console.log(event)
    //     return event
    // }))}

    // // *** домашнее задание
    if(this.cacheService.allowCache(request)) {
      const cachedResponse = this.cacheService.getDataFromCache(request);
      return cachedResponse ? of(cachedResponse) : this.getDataFromServer(request, next);
    }
    return this.getDataFromServer(request, next);
  }

  getDataFromServer(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log('получаем данные из HTTP:', next.handle(request));
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
