// директива цепляется на любой элемент, в инпут директивы передаётся id кнопки закрытия,
// при клике вне элемента директивы у кнопки закрытия будет вызван метод click()

import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[clickclose]'
})
export class ClickCloseDirective {

  constructor(private elRef: ElementRef) { }

  btnCloseId: any;
  btnClose: any;

  @Input() set clickclose(id) {
    this.btnCloseId = id
  }

  get host() {
    return this.elRef.nativeElement}

  @HostListener('window:click', ['$event.target']) onClick(event)
   {
    this.btnClose = document.getElementById(`${this.btnCloseId}`)

    // if (this.host.contains(event)) return
    if (!this.host.contains(event)) {this.btnClose.click()} else return

  }

}
