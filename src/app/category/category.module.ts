import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { TooltipDirective } from '../directives/tooltip.directive';
import { TooltipContainerDirective } from '../directives/tooltip-container.directive';

@NgModule({
  declarations: [
    CategoryComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [CategoryComponent],
})
export class CategoryModule { }
