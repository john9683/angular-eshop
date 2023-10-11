import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SliderDirective } from '../directives/slider.directive';
import { RouterModule } from '@angular/router';
import { CatalogRoutingModule } from '../catalog/catalog-routing.module';
import { ButtonModule } from '../button/button.module';



@NgModule({
  declarations: [
    HomeComponent,
    SliderDirective,
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    ButtonModule,
  ],
exports: [HomeComponent, RouterModule],
})
export class HomeModule { }
