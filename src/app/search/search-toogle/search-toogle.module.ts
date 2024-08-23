import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchToogleComponent } from './search-toogle.component';
import { ButtonModule } from 'src/app/button/button.module';

@NgModule({
  declarations: [
    SearchToogleComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [SearchToogleComponent],
})
export class SearchToogleModule { }
