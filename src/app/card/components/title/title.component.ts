import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
    <div class="mb-10 mw-200 mh-20 fw-600">{{title}}</div>
  `,
  styles:  [`
  .mw-200 {
    max-width: 200px;
  }

  .mh-20 {
    max-height: 20px;
    overflow: hidden;
  }

  .mb-10 {
    margin-bottom: 10px;
  }

  .fw-600 {
    font-weight: 600;
  }

  `]
})
export class TitleComponent implements OnInit {

  @Input() title:string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
