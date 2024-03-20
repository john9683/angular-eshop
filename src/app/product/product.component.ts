import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CatalogService } from '../services/catalog.service';

import { Product } from '../interfaces-and-types/interfaces';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product;

  public productId: number;

  openRoute(route: string): void {
    this.router.navigate(['/', route])
  }

  constructor(
    public dataService: DataService,
    public catalogService: CatalogService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.productId = +this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.catalogService.getProduct(this.productId);
  }
}
