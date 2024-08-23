import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip-content',
  template: `
    <p>
      tooltip-content works!
    </p>
  `,
  styles: [
  ]
})
export class TooltipContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
