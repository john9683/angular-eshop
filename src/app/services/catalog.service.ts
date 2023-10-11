import { ChangeDetectionStrategy, Component, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFromServer, QueryOptions, Toggle } from '../interfaces-and-types/interfaces';
import { Product } from '../interfaces-and-types/interfaces';
import { FilterTypes } from '../interfaces-and-types/types';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { HttpService } from './http.service';

@Injectable()

export class CatalogService {
  queryParams = {}
  product: Product | undefined;
  selectedButton!: Toggle;

  constructor(
    private httpService: HttpService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}


    // 1 записать Query
    applyQuery(param: QueryOptions): void {
        this.router.navigate([], {
        relativeTo: this.route,
        queryParams: param,
        // queryParamsHandling: 'merge',
      })
    }

    // 2 получить Query
    getQuery(){
      return this.route.snapshot.queryParams;
    }

    // 3 получить товары по Query
    getProducts(page: number = 1, filterBy: FilterTypes): Observable<DataFromServer> {

      this.applyQuery({ page: page, orderBy: filterBy });

      return this.httpService.get(
        `products/?page=${page}&limit=10&orderBy=${filterBy}`
      );
    }

    // получить товар по id или ошибку запроса
    getProduct(productId: number): Product | undefined {
      this.dataService.getProductById(productId)
        .subscribe(
          (result => {this.product = result;
            // Object.keys(result).forEach((key) => { console.log('prop:', key, result[key])});
          }),
          (httpResponse => {console.log('Ошибка запроса:', httpResponse.error.message); {if (httpResponse.status === 404) this.router.navigate(['not-found'])}})
        );
      return this.product
    }

}


