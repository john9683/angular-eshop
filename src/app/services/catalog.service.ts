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

    applyQuery(param: QueryOptions): void {
        this.router.navigate([], {
        relativeTo: this.route,
        queryParams: param,
      })
    }

    getQuery(){
      return this.route.snapshot.queryParams;
    }

    getProducts(page: number = 1, filterBy: FilterTypes): Observable<DataFromServer> {

      this.applyQuery({ page: page, orderBy: filterBy });

      return this.httpService.get(
        `products/?page=${page}&limit=10&orderBy=${filterBy}`
      );
    }

    getProduct(productId: number): Product | undefined {
      this.dataService.getProductById(productId)
        .subscribe(
          (result => {this.product = result;
          }),
          (httpResponse => {console.log('Ошибка запроса:', httpResponse.error.message); {if (httpResponse.status === 404) this.router.navigate(['not-found'])}})
        );
      return this.product
    }

}


