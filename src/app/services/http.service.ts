import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataFromServer, Product } from '../interfaces-and-types/interfaces';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';

@Injectable(
{providedIn: 'root'}
)

export class HttpService {
  api = environment.api;
  constructor(private http: HttpClient, private cacheService:  CacheService) { }

  get<DataFromServer>(url: string | number): Observable<DataFromServer>{

    let data$

    data$ = this.http.get<DataFromServer>(this.api + url);

    return data$;
  }

  // // *********************************************************************************************************
  // // пример POST-запроса
  // post<T>(url: string, body: any): Observable<T>{
  //   return this.http.post<T>(url, body)
  // }

  // // *********************************************************************************************************
  // // пример DELETE-запроса
  // delete<T>(url: string): Observable<T>{
  //   return this.http.delete<T>(url)
  // }

  // // *********************************************************************************************************
  // // пример PUT-запроса
  // put<T>(url: string, body: any): Observable<T>{
  //   return this.http.put<T>(url, body)
  // }

  // // *********************************************************************************************************
  // // пример PATCH-запроса
  // patch<T>(url: string, body: any): Observable<T>{
  //   return this.http.patch<T>(url, body)
  // }

}

