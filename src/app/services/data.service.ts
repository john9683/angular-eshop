import { Injectable } from '@angular/core';
import { DataFromServer, Product, QueryOptions } from '../interfaces-and-types/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpService } from '../services/http.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(  private httpService: HttpService,) { }

  getProductById(id: number): Observable<Product> {
    return this.httpService.get<Product>(`products/${id}`)
  }

}


