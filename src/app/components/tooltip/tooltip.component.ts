import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { TooltipContainerDirective } from 'src/app/directives/tooltip-container.directive';
import { tooltipPosition } from 'src/app/interfaces-and-types/types';

@Component({
  selector: 'app-tooltip',
  template: `
    <div class="tooltip-container" [style.top.px] = this.tooltipTop  [style.left.px] = this.tooltipLeft>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
  :host {
    display: block;
  }
  p {margin: 0; padding: 0;}
  :host {display: block}
  .tooltip-container {
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0,0,0, .15);
    display: inline-block;
    padding: 8px;
    position: fixed;
    border-radius: 4px;
    border: 1px solid #d2d2d2;
    box-shadow: 0 4px 8px rgba(0, 0, 0.15);
    }
  `]
})
export class TooltipComponent implements AfterViewInit  {

  tooltipTop: number
  tooltipLeft: number

  @ViewChild(TooltipContainerDirective, {read: ElementRef}) private tooltipContainer: ElementRef

  constructor(@Inject('tooltipConfig') private config: {host: HTMLElement, tooltipPosition: tooltipPosition, tooltipMargin: number}, private cdr: ChangeDetectorRef,) { }

  ngAfterViewInit(): void {

    const HOST_TOP  = this.config.host.getBoundingClientRect().top
    const HOST_LEFT  = this.config.host.getBoundingClientRect().left
    const HOST_HEIGHT  = this.config.host.getBoundingClientRect().height
    const HOST_WIDTH  = this.config.host.getBoundingClientRect().width

    const TOOLTIP_HEIGHT = this.tooltipContainer.nativeElement.getBoundingClientRect().height
    const TOOLTIP_WIDTH = this.tooltipContainer.nativeElement.getBoundingClientRect().width

    const REQUIRED_TOOLTIP_HEIGHT = TOOLTIP_HEIGHT + this.config.tooltipMargin * 2;
    const REQUIRED_TOOLTIP_WIDTH = TOOLTIP_WIDTH + this.config.tooltipMargin * 2;

    const TOOLTIP_ABOVE = HOST_TOP - TOOLTIP_HEIGHT - this.config.tooltipMargin
    const TOOLTIP_BELOW = HOST_TOP + HOST_HEIGHT + this.config.tooltipMargin
    const TOOLTIP_RIGHT = HOST_LEFT + HOST_WIDTH + this.config.tooltipMargin
    const TOOLTIP_LEFT = HOST_LEFT - TOOLTIP_WIDTH - this.config.tooltipMargin

    this.tooltipLeft = HOST_LEFT
    this.tooltipTop = HOST_TOP

    if ( this.config.tooltipPosition === 'above' ) {
      this.tooltipTop = REQUIRED_TOOLTIP_HEIGHT <= HOST_TOP ? this.tooltipTop = TOOLTIP_ABOVE : this.tooltipTop = TOOLTIP_BELOW
    }

    if ( this.config.tooltipPosition === 'below' ) {
      this.tooltipTop = REQUIRED_TOOLTIP_HEIGHT <= innerHeight - HOST_TOP - HOST_HEIGHT ? TOOLTIP_BELOW : TOOLTIP_ABOVE
    }

    if ( this.config.tooltipPosition === 'right' ) {
      this.tooltipLeft = REQUIRED_TOOLTIP_WIDTH <= innerWidth - HOST_LEFT - HOST_WIDTH ? TOOLTIP_RIGHT : TOOLTIP_LEFT
    }

    if ( this.config.tooltipPosition === 'left' ) {
      this.tooltipLeft = REQUIRED_TOOLTIP_WIDTH <= HOST_LEFT ? TOOLTIP_LEFT : TOOLTIP_RIGHT
    }

    this.cdr.detectChanges()
  }

}


