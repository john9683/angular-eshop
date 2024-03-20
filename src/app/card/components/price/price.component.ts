import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  template: `
     <div class="mb-10 fw-600">{{price | currency: '₽':'symbol-narrow':'1.0':'ru-RU'}}</div>
  `,
  styles:  [`
  .mb-10 {
    margin-bottom: 10px;
  }

  .fw-600 {
    font-weight: 600;
  }

  `]
})
export class PriceComponent implements OnInit {

  @Input() price: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
