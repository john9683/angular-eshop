import { Component,  OnInit, Input, ContentChild,  ContentChildren, QueryList, ChangeDetectorRef, } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { CatalogService } from '../services/catalog.service';
import { CartService } from '../services/cart.service';
import { Product, Toggle } from '../interfaces-and-types/interfaces';
import { tap, takeUntil, } from 'rxjs/operators';
import { buttonColors, FilterTypes } from '../interfaces-and-types/types';
import { ToggleComponent } from '../toggle/toggle.component';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})

export class CatalogComponent implements OnInit {
  @ContentChild(ToggleComponent) toggleComponent: ToggleComponent
  @ContentChildren(ToggleComponent) toggleComponents: QueryList<ToggleComponent>

  mainPage!: number;
  lastPage!: boolean;
  meta!: any;
  productItems: Product[] = [];
  totalPages: number;
  sortValue: FilterTypes = 'id';
  destroy$ = new Subject<void>();
  toggleValue:any;

  @Input() filterBy: FilterTypes;
  @Input() selected!: Toggle | undefined;
  @Input() isActive = false;

  toggles: Toggle[] = [
    {label: 'Все товары', filterBy: 'id'},
    {label: 'По цене', filterBy: 'price'},
    {label: 'По рейтингу', filterBy: 'rating'},
    {label: 'По категории', filterBy: 'category'},
    {label: 'По производителю', filterBy: 'company'},
    {label: 'По названию товара', filterBy: 'title'},
  ];

  constructor(
    public dataService: DataService,
    public catalogService: CatalogService,
    public cartService: CartService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.mainPage = 0;
    this.setQueryParam();
    for (let i = 1; i <=  this.mainPage; i++) {this.downloadProducts(i);}
    this.catalogService.getQuery();
    this.selected = this.getRouteFilter()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  downloadProducts(page?: number): void {
    this.lastPage = false;

    if (!page) {
      if (this.mainPage < this.meta.totalPages) {this.mainPage += 1
      } else if (
      this.mainPage >= this.meta.totalPages) { this.lastPage = true; this.mainPage = 1}
    }

    this.catalogService
      .getProducts(page || this.mainPage, this.sortValue)
      .pipe(
          takeUntil(this.destroy$),
          tap((data) => {
          this.meta = data.meta;
          this.productItems = this.productItems.concat(data.items);
          if (!page) {
            if (this.mainPage === 1 && !this.lastPage) {this.productItems = data.items; this.mainPage += 1;}
            if (this.mainPage === 1 && this.lastPage) {this.productItems = data.items;}
          }}))
      .subscribe();
    }

    setQueryParam() {
      this.mainPage =
        this.catalogService.getQuery()['page'] > 1 ? Number(this.catalogService.getQuery()['page']) : 1;
      this.sortValue =
        this.catalogService.getQuery()['orderBy'] ? this.catalogService.getQuery()['orderBy'] : 'id';
    }

  currentPage(): boolean {
    return this.meta.currentPage === this.meta.totalPages;
  }

  sortProducts(value: FilterTypes): void {
    this.mainPage = 2;
    this.sortValue = value;

    this.catalogService
      .getProducts(1, value)
      .pipe(
        takeUntil(this.destroy$),
        tap((data) => {
          this.meta = data.meta;
          this.productItems = data.items;
        })
      )
      .subscribe();
  }

  getLoadedItems():number {
    const loadedItems =  (this.meta.currentPage - 1) *  this.meta.itemsPerPage +  this.meta.itemCount;
    return loadedItems;
  }

  setNewText():string {
    let goods,
    newText:string,
    remains = this.meta.totalItems - this.getLoadedItems();

    if ( remains > 10) {goods = 10} else if ( remains < 10 ) {goods = remains};
      newText = `Всего товаров в каталоге: ${this.meta.totalItems}. Загружено ${this.getLoadedItems()}. Загрузить ещё ${goods}.`;
    if ( remains <= 0 ) {newText = `Мы загрузили всё что было и больше у нас ничего нет :-( Нажмите, чтобы начать сначала`};
    return   newText
  }

  setNewColor():buttonColors {
    let newColor;
    if ( this.meta.totalItems - this.getLoadedItems() > 0) newColor = 'primary';
    if ( this.meta.totalItems - this.getLoadedItems() <= 0) newColor = 'accent';
    return newColor;
  }

  selectedChanged(item: Toggle): void {
    this.selected = item;
    const value = item.filterBy
    this.cdr.detectChanges()
  }

  getRouteFilter() {
    const filter = this.route.snapshot.queryParams["orderBy"];
    const selectedFilter = this.toggles.find(x => x.filterBy === filter);
    if (!filter) {return} else {return selectedFilter};
  }

}
