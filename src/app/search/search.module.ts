import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchToogleModule } from './search-toogle/search-toogle.module';
import { ClickCloseDirective } from '../directives/click-close.directive';
import { RouterModule } from '@angular/router';
import { CatalogRoutingModule } from '../catalog/catalog-routing.module';

@NgModule({
  declarations: [
    SearchComponent,
    ClickCloseDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchToogleModule,
    CatalogRoutingModule
  ],
  exports: [SearchComponent, RouterModule],
})
export class SearchModule { }
