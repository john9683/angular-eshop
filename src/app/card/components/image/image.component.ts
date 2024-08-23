import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces-and-types/interfaces';

@Component({
  selector: 'app-image',
  template: `
    <a [routerLink]="['/product', productId]">
      <div class="images-wrap">
        <img class="flex-center w-200 h-200 mb-5 img-contain" src="{{src}}" alt="фото товара">
      </div>
    </a>
  `,

  styles: [`

  .flex-center {
    display: flex;
    justify-content: center;
  }

  .w-200 {
    width: 200px;
  }

  .h-200 {
    height: 200px;
  }
  .mb-5 {
    margin-bottom: 5px;
  }

  .img-contain {
    object-fit: contain;
  }

  img {
    transition: transform .15s ease-in-out;
  }

  .images-wrap {
    position: relative;
  }

  .images-wrap:after {
    content: "Перейти на страницу товара";
    position: absolute;
    text-align: center;
    padding: 12px 10px;
    top: 70px;
    left: -11px;
    right: -11px;
    font-weight: 500;
    font-size: 14px;
    color: white;
    background-color: rgb(226, 47, 181);
    border-radius: 10px;
    transition: transform .15s ease-in-out;
    transform-origin: center;
    transform: scale(0, 0);
    cursor: pointer;
  }

  .images-wrap:hover.images-wrap:after {
    transform: scale(1, 1);
  }

  `]
})
export class ImageComponent implements OnInit {

  @Input() product: Product;
  @Input() src:string | undefined;
  @Input() productId: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
