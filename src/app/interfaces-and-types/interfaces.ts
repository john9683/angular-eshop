export interface Product {
  id?: number,
  company: string,
  title: string,
  price: number,
  available?: boolean,
  discount?: boolean,
  image?: string,
  rating: number,
  category: string,
  descr?: string,
}

export interface ProductInCart {
  count: number;
  product: Product;
}

export interface Toggle {
  label: string;
  filterBy: any;
}

export interface Meta {
  [key: string]: number;
}

export interface DataFromServer {
  items: Product[];
  meta: Meta;
}

export interface QueryOptions {
  [key: string]: string | number | undefined;
}

export interface SliderContext {
  $implicit: Product,
  controls: {
    prev: () => void,
    next: () => void,
  }
}

