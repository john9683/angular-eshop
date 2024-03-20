import { AfterContentInit,  ChangeDetectionStrategy,  ChangeDetectorRef,  Component, ContentChild, ContentChildren, ElementRef, EventEmitter, OnInit, Output, QueryList, } from '@angular/core';
import { map, merge, Observable,  } from 'rxjs';
import { FilterTypes, } from 'src/app/interfaces-and-types/types';
import { CatalogService, } from 'src/app/services/catalog.service';
import { ToggleComponent, } from 'src/app/toggle/toggle.component';

@Component({

  selector: 'app-toggle-group',
  template: `
    <div class="flex-row-start mb-20">
      <ng-content></ng-content>
    </div>
  `,

    styles: [ `
    .flex-row-start {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    }

    .mb-20 {
      margin-bottom: 20px;
    }

    .mr-5 {
      margin-right: 5px;
    }
  `],
changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToggleGroupComponent implements OnInit, AfterContentInit {
  @ContentChild(ToggleComponent, {read: ElementRef}) toggleComponentBtn: ElementRef
  @ContentChild(ToggleComponent) toggleComponent: ToggleComponent
  @ContentChildren(ToggleComponent) toggleComponents: QueryList<ToggleComponent>

 toggleComponentValue: FilterTypes;
 @Output() emitChangeActiveToggle: EventEmitter<FilterTypes> = new EventEmitter();

  ngAfterContentInit(): void {

    const clicks$: Array<Observable<ToggleComponent>> = this.toggleComponents.map(toggleComponent => toggleComponent.click$.pipe(map(() => toggleComponent)));
    merge(...clicks$).subscribe(toggleComponent => { this.emitChangeActiveToggle.emit(toggleComponent.filterBy);
    });
  }

  constructor( public catalogService: CatalogService, private cdr: ChangeDetectorRef,  ) { }

  ngOnInit(): void {
  }

}

