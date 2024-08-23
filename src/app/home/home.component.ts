import { Component, OnInit } from '@angular/core';
import { Observable,} from 'rxjs';
import { DataFromServer, Product } from '../interfaces-and-types/interfaces';
import { CatalogService } from '../services/catalog.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public catalogService: CatalogService, private httpService: HttpService,) { }
  ngOnInit(): void {this.downloadProducts(100) }

  getProducts(limit: number): Observable<DataFromServer> {
    return this.httpService.get(
      `products/?limit=${limit}`
    );
  }

  productItems: Product[] = [];
  downloadProducts(limit: number): void {
      this.getProducts(limit)
      .subscribe(data => {this.productItems = data.items});
  }

}

