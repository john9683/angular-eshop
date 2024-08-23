import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { buttonColors, buttonSize } from '../interfaces-and-types/types';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],

})

export class ButtonComponent implements OnInit, OnChanges {

  @Input() text: string = 'Кнопка'
  @Input() color: buttonColors = 'default';
  @Input() size: buttonSize = 'default'
  @Input() isActive = false;
  @Input() isDisabled = false;

  innerColor: buttonColors = 'default';
  innerSize: 'default' | 'large' | 'small' = 'default'

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const {color, size} = changes;
    if (color && color.currentValue) {
      this.innerColor = color.currentValue;
    }
    if (size && size.currentValue) {
      this.innerSize = size.currentValue;
    }
  }

  ngOnInit(): void {
  }

}
