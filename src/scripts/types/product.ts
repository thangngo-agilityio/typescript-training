export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: string
}

export type ProductCard = Omit<Product, 'id'>

export type AddProduct = ((product: Product) => Promise<void>)
export type UpdateProduct = ((product: Product) => Promise<void>) | null
