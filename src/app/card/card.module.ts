import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { ButtonModule } from 'src/app/button/button.module';
import { CatalogRoutingModule } from 'src/app/catalog/catalog-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CardComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CatalogRoutingModule
  ],
  exports: [CardComponent,  RouterModule],
})
export class CardModule { }
