import { Component, OnInit, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../services/catalog.service';
import { FilterTypes } from '../interfaces-and-types/types';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToggleComponent implements OnInit {

  @Input() filterBy: FilterTypes;
  click$: Observable<Event> = fromEvent(this.host.nativeElement, 'click');

  constructor(private route: ActivatedRoute, public catalogService: CatalogService, private host: ElementRef) { }

  ngOnInit(): void {}

}
