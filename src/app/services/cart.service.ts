import { Injectable } from '@angular/core';
import { Product, ProductInCart } from '../interfaces-and-types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  inCart: ProductInCart[] = [];
  productInCart:  ProductInCart | undefined;

  constructor() { }

  addProduct($event: Product): ProductInCart[] {
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

  removeProduct($event: Product): ProductInCart[] {
    const index = this.inCart.findIndex(ProductInCart => ProductInCart.product === $event);
     if (index !== -1) {
      this.inCart.splice(index, 1);
    }
    this.inCart = [...this.inCart];
    return this.inCart;
  }

  getCart(): ProductInCart[] {
    return this.inCart;
  }

  getCount(): number {
    return this.inCart.length;
  }

  clearCart():ProductInCart[] {
    this.inCart = [];
    return  this.inCart;
  }
}
