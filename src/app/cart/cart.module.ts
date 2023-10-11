import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { ButtonModule } from 'src/app/button/button.module';
import { RouterModule } from '@angular/router';
import { CatalogRoutingModule } from 'src/app/catalog/catalog-routing.module';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, ButtonModule, CatalogRoutingModule],
  exports: [RouterModule, CartComponent],
})
export class CartModule { }

