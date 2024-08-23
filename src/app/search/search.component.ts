import { Component, OnInit, Input } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, switchMap, } from 'rxjs';
import { DataFromServer, } from '../interfaces-and-types/interfaces';
import { HttpService } from 'src/app/services/http.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute,  } from '@angular/router';
import { SearchFilterTypes } from '../interfaces-and-types/types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() placeholder: string = 'Поиск товара в каталоге по';
  @Input() textForNotFound: string = 'Мы ничего не нашли, попробуйте изменить фильтр или условие поиска';

  input:any

  searchForm: FormGroup = new FormGroup({
    searchInput: new FormControl<string>('')
  });

  constructor(private httpService: HttpService, private route: ActivatedRoute,) { }

  products$: Observable<DataFromServer> = this.httpService.get(`products/?limit=100`);
  activeFilter: SearchFilterTypes ='title';

  close() {
    this.searchForm.reset();
    this.input?.classList.remove('shadow')
  }

  changeFilterSearch(filter: SearchFilterTypes):void {
    this.activeFilter = filter;
    this.searchForm.reset();
    this.input.classList.remove('shadow')
  }

  searchResult$: Observable<any | null> | undefined = this.searchForm.get('searchInput')?.valueChanges.pipe(
    distinctUntilChanged(),
    debounceTime(300),
    switchMap((value) => {
      return this.products$.pipe(
        map((data) => {
          if (value){
            this.input = window.document.getElementById("input")
            this.input.classList.add('shadow')
            return data.items.filter(
              (product) =>
                product[this.activeFilter]
                  .toLowerCase()
                  .indexOf((value as string).toLowerCase()) !== -1
            );
          } else return
        })
      );
    })

  );

  ngOnInit(  ) {}

}
