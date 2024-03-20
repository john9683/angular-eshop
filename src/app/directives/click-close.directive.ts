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

    if (!this.host.contains(event)) {this.btnClose.click()} else return

  }

}
