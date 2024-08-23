import { Component, OnInit, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductInCart } from '../interfaces-and-types/interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnChanges {
  @Input() inCart: ProductInCart[];
  opened = false;
  googsInCart= false;
  @Output() removeProduct = new EventEmitter<any>();
  @Output() clear =  new EventEmitter<any>();
  amount = 0;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      const {inCart} = changes;
      if (inCart && inCart.currentValue && inCart.currentValue.length > 0){
      this.amount = inCart.currentValue
        .map(x => x.product.cost * x.count)
        .reduce((previous, current) => {
          return previous + current;
        });
    }else {
      this.amount = 0;
    }
  }

  open() {
    this.opened = !this.opened;
  }

  remove(item) {
    this.removeProduct.emit(item);
    if (!this.inCart.length) this.googsInCart= false;
  }

  clearAll() {
    this.clear.emit();
    this.googsInCart= false;
  }

  qntyGood(q){
    let good;
    if (q === 1) {good = "товар"}
    else if (q === 2 || q === 3 || q === 4 ) {good = "товара"}
    else {good = "товаров"}
    return good
  }

  cartInfo(){
    let info;
    const goods = this.inCart.length
    if (goods === 0) {info = "В корзине ничего нет :-("}
    else if (goods === 1 ) {info = `В корзине ${goods} товар`; this.googsInCart = true}
    else if (goods === 2 || goods === 3 || goods === 4 ) {info = `В корзине ${goods} товара`; this.googsInCart = true}
    else {info = `В корзине ${goods} товаров`; this.googsInCart = true}
    return info
  }

}
