import { Directive } from '@angular/core';

@Directive({
  selector: '.tooltip-container' // директива привяжется к любому элементу с этим классом
})
export class TooltipContainerDirective {

  constructor() { }

}
