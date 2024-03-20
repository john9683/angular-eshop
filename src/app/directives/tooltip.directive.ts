import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostListener, Injector, Input, OnDestroy, Renderer2, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';
import { tooltipPosition } from '../interfaces-and-types/types';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnDestroy {
  @Input() tooltipPosition: tooltipPosition = 'above';
  @Input() tooltipMargin: number = 10;
  @Input('tooltip') content: string | TemplateRef<any> | Type<any>

  private componentRef: ComponentRef<TooltipComponent>

  @HostListener('mouseenter') mouseenter() {
    const factory = this.componentResolver.resolveComponentFactory(TooltipComponent)
    const injector = Injector.create({
      providers:[
        {
          provide: 'tooltipConfig',
          useValue: {
            host: this.elementRef.nativeElement,
            tooltipPosition: this.tooltipPosition,
            tooltipMargin: this.tooltipMargin
          }
        }
      ]
    })
    this.componentRef = this.vcr.createComponent(factory, 0, injector, this.createTooltipContent())
  }

  private destroyTooltip(){
    if(this.componentRef){this.componentRef.destroy()}
  }

  @HostListener('mouseout') mouseout() {
    this.destroyTooltip()
  }

  private createTooltipContent(): any {
    if(typeof this.content === 'string'){
      const elementText = this.renderer.createText(this.content)
      return elementText
    }

    if(this.content instanceof TemplateRef) {
      const viewRef = this.content.createEmbeddedView({})
      return [viewRef.rootNodes]
    }

    const factory = this.componentResolver.resolveComponentFactory(this.content)
    const viewComponentRef = factory.create(this.injector)
    return viewComponentRef.location.nativeElement
  }

  ngOnDestroy(): void {
    this.destroyTooltip()
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private vcr: ViewContainerRef,
    private componentResolver: ComponentFactoryResolver,
    private injector: Injector
    ) {}

}
