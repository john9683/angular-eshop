import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from 'src/app/product/product-routing.module';
import { CatalogRoutingModule } from 'src/app/catalog/catalog-routing.module';
import { CatalogService } from '../services/catalog.service';
import { LoaderModule } from 'src/app/loader/loader.module';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    LoaderModule
  ],
  exports: [ProductComponent],
  providers: [CatalogService],
})
export class ProductModule { }
