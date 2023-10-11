import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Product, SliderContext } from '../interfaces-and-types/interfaces';



@Directive({
  selector: '[ngSlider]'
})
export class SliderDirective implements OnInit, OnDestroy {
  context: SliderContext
  activeIndex: number = 0
  intervalId: number | undefined = undefined
  _autoplayDelay: number

  @Input('ngSliderOf') products: Product[]
  @Input('ngSliderAutoplay') set autoplay(autoplay: 'on' | 'off') {
    autoplay === 'on' ? this.enableAutoPlay() : this.clearAutoPlay()
  }
  @Input('ngSliderAutoplayDelay') set autoplayDelay(delay: number) {
    this._autoplayDelay = delay
  }
  get autoplayDelay() {
    return this._autoplayDelay || 1000
  }

  enableAutoPlay(): void {
    this.intervalId = window.setInterval(() => {
      this.next()
    }, this.autoplayDelay)
  }

  clearAutoPlay(): void {
    window.clearInterval( this.intervalId)
  }

  prev(): void {
    this.activeIndex -=1
    if (this.activeIndex <0) {
      this.activeIndex = this.products.length - 1
    }
    this.context.$implicit = this.products[this.activeIndex]
  }

  next(): void {
    this.activeIndex +=1
    if (this.activeIndex >= this.products.length) {
      this.activeIndex = 0
    }
    this.context.$implicit = this.products[this.activeIndex]
  }

  ngOnDestroy(): void {
    this.clearAutoPlay()
  }

  ngOnInit(): void {
    this.context = {$implicit: this.products[0],
      controls: {
        prev: () => this.prev(),
        next: () => this.next()
      }
    }
    this.vcr.createEmbeddedView(this.template,  this.context)
  }

  constructor(private template: TemplateRef<SliderContext>, private vcr: ViewContainerRef) { }

}
