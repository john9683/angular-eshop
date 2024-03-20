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

}

