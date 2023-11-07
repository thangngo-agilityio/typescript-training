import { Product } from "@/types/product"

const sortAsc = (key: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return (a: Product, b: Product) => (a[key] > b[key]) ? 1 : (b[key] > a[key]) ? -1 : 0
}
const sortDesc = (key: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return (a: Product, b: Product) => (a[key] < b[key]) ? 1 : (b[key] < a[key]) ? -1 : 0
}

export const sortNameAsc = (data: Product[]): void => {
  data.sort(sortAsc('name'))
}

export const sortNameDec = (data: Product[]): void => {
  data.sort(sortDesc('name'))
}

export const sortPriceAsc = (data: Product[]): void => {
  data.sort(sortAsc('price'))
}

export const sortPriceDec = (data: Product[]): void => {
  data.sort(sortDesc('price'))
}

