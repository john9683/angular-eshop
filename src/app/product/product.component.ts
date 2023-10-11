import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; // роут для 404
import { DataService } from '../services/data.service';
import { CatalogService } from '../services/catalog.service';

import { Product } from '../interfaces-and-types/interfaces';
// import products from '../../assets/data.products.json'
// import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product;

  // public products = products;

  public productId: number;

  openRoute(route: string): void { // роут для 404   -- способ 2 для октрытия 404
    this.router.navigate(['/', route]) // роут для 404
  }

  constructor(
    public dataService: DataService,
    public catalogService: CatalogService,
    private router: Router,
    private route: ActivatedRoute,
    // private httpService: HttpService,
  ) {
    this.productId = +this.route.snapshot.params['id'];   // + преобразует string в number
  }

  ngOnInit() {
    this.catalogService.getProduct(this.productId);
  }
}
