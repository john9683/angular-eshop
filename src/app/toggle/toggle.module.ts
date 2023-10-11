import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ToggleComponent } from './toggle.component';
import { ButtonModule } from 'src/app/button/button.module';

@NgModule({
  declarations: [
    // ToggleComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    // ToggleComponent
  ],
})
export class ToggleModule { }
