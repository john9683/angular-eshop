import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  template: `
    <div class="mb-10 fw-600">{{company}} <span class="fw-400">| {{category}}</span></div>
  `,
  styles: [`
    .mb-10 {
      margin-bottom: 10px;
    }

    .fw-600 {
      font-weight: 600;
    }

    .fw-400 {
      font-weight: 400;
    }

  `]
})
export class CompanyComponent implements OnInit {

  @Input() company: string | undefined;
  @Input() category: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
