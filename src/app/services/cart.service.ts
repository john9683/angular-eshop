import { Injectable } from '@angular/core';
import { Product, ProductInCart } from '../interfaces-and-types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  inCart: ProductInCart[] = [];
  productInCart:  ProductInCart | undefined;

  constructor() { }

  // 1 тз
  addProduct($event: Product): ProductInCart[] {  // using in catalog.component.html
    const countTheProduct = this.inCart.filter(count => count.product === $event).length ?? 0;
     if (countTheProduct === 0) {
      this.inCart.push({product: $event, count:1});
    } else {
      this.productInCart = this.inCart.find(count => count.product === $event);
      if (this.productInCart) {this.productInCart.count += 1};
    }
    this.inCart = [...this.inCart];
    return this.inCart;
  }

  // 2 тз
  removeProduct($event: Product): ProductInCart[] { // using in catalog.component.html
    const index = this.inCart.findIndex(ProductInCart => ProductInCart.product === $event);
     if (index !== -1) {
      this.inCart.splice(index, 1);
    }
    this.inCart = [...this.inCart];
    return this.inCart;
  }

  // 3 тз
  getCart(): ProductInCart[] { // using in cart.component.html
    return this.inCart;
  }

  // 4 тз
  getCount(): number {         // using in cart.component.html
    return this.inCart.length;
  }

  clearCart():ProductInCart[] {
    this.inCart = [];
    return  this.inCart;
  }
}
