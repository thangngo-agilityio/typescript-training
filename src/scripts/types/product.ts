export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number
}

export type ProductCard = Omit<Product, 'id'>
