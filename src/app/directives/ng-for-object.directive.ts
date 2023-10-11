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
    // console.log('objectChanges', objectChanges)
    // this.viewContainerRef.clear(); // без этой строки при каждом добавлении товаров количество лишек увеличивается без строк ниже

    if (objectChanges) {objectChanges.forEachItem((record: KeyValueChangeRecord<string, any>) => {
      this.viewContainerRef.createEmbeddedView(this.templateRef, {$implicit: [record.key, record.currentValue]})
    })}

    // Object.keys(this.object).forEach((prop) => {this.viewContainerRef.createEmbeddedView(
    //   this.templateRef, {$implicit: [prop, this.object[prop]]}
    // ) });
    // console.log('DoCheck')
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private iterableKeyValue: KeyValueDiffers
  ) {
    this.differ = this.iterableKeyValue.find(this.object).create()
  }

  // // *** простейшая работающая директива для тестирования подключения директив ***
  // @Input() set appNgForObject(condition: boolean) {
  //   condition ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear()
  // }

}
