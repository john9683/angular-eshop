import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toggle } from 'src/app/interfaces-and-types/interfaces';
import { SearchFilterTypes } from 'src/app/interfaces-and-types/types';

@Component({
  selector: 'app-search-toogle',
  templateUrl: './search-toogle.component.html',
  styleUrls: ['./search-toogle.component.scss']
})
export class SearchToogleComponent implements OnInit {
  @Input() selected!: Toggle | undefined;
  @Input() isActive = false;
  @Output() toogleFilter = new EventEmitter<SearchFilterTypes>();

  toggles: Toggle[] = [
    {label: 'названию товара', filterBy: 'title'},
    {label: 'производителю', filterBy: 'company'},
    {label: 'категории', filterBy: 'category'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

  selectedFilter(item: Toggle): void {
    this.toogleFilter.emit(item.filterBy);
    this.selected = item;
  }

}
