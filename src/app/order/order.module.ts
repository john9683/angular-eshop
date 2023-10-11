import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { ButtonModule } from 'src/app/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    OrderComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule
  ]
})
export class OrderModule { }
