import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[borderradius]'
})
export class BorderRadiusDirective {

  constructor(private elRef: ElementRef) { }

  get host() {
    return this.elRef.nativeElement}

  @Input() set borderradius(type: 'square' | 'ellipse' | 'round' ) {
    if
    (type === 'square') {this.host.style.borderRadius = '10px'}
    else if
    (type === 'ellipse') {this.host.style.borderRadius = '20px'}
    else if
    (type === 'round') {this.host.style.borderRadius = '50%'}
  }

  @Input() background: string = 'transparent'
  @HostBinding('style.backgroundColor') get backgroundColor() {
    return this.background
  }

  @Input() outline: string | boolean = false
  @HostBinding('class.outline-card') get outlineClass() {
   return this.outline
  }

  isHover:boolean = false
  @HostListener('mouseenter') onMouseEnter(){
    this.isHover = true
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.isHover = false
  }
  @HostBinding('class.hover') get hover() {
    return this.isHover
  }

}
