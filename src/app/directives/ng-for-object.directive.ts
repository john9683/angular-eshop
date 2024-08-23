import { Directive, DoCheck, Input, KeyValueChangeRecord, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngForObject]'
})

export class NgForObjectDirective implements DoCheck{
  object: Object = {};
  differ!: KeyValueDiffer<string, any>

    @Input('ngForObjectOf') set ngForObject(obj: Object) {
      this.object = obj;
    }

  ngDoCheck(): void {
    const objectChanges:KeyValueChanges<string, any> | null = this.differ.diff(this.object)

    if (objectChanges) {objectChanges.forEachItem((record: KeyValueChangeRecord<string, any>) => {
      this.viewContainerRef.createEmbeddedView(this.templateRef, {$implicit: [record.key, record.currentValue]})
    })}

  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private iterableKeyValue: KeyValueDiffers
  ) {
    this.differ = this.iterableKeyValue.find(this.object).create()
  }

}
