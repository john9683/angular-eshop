import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-pagination',
  templateUrl: './button-pagination.component.html',
  styleUrls: ['./button-pagination.component.scss']
})
export class ButtonPaginationComponent implements OnInit {
  @Input() page: number
  @Input() isCurrent = false
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

}
