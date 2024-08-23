import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CacheService {
  cacheData = new Map();

  allowCache(request: HttpRequest<unknown>): boolean {
    return request.method === 'GET';
  }

  getDataFromCache(request: HttpRequest<unknown>): HttpResponse<unknown> | undefined {
    return this.cacheData.get(request.urlWithParams)?.response;
  }

  saveDataToCache(request: HttpRequest<unknown>, response: HttpResponse<unknown>): void {
    const cacheUrl = request.urlWithParams;
    const cacheResponse = {cacheUrl, response};
    this.cacheData.set(cacheUrl, cacheResponse);
  }

  constructor() { }
}
