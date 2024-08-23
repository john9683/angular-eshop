import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import { SearchModule } from 'src/app/search/search.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    TopBarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SearchModule,
  ],
  exports: [TopBarComponent],
})
export class TopBarModule { }
