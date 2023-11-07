// import { Product } from "@/types/product"

// const sortAsc = (key: string) => {

//   return (a, b) => (a[key] > b[key]) ? 1 : (b[key] > a[key]) ? -1 : 0
// }
// const sortDesc = (key: string) => {

//   return (a, b) => (a[key] < b[key]) ? 1 : (b[key] < a[key]) ? -1 : 0
// }

// export const sortNameAsc = (data: Product[]): void => {
//   data.sort(sortAsc('name'))
// }

// export const sortNameDec = (data: Product[]): void => {
//   data.sort(sortDesc('name'))
// }

// export const sortPriceAsc = (data: Product[]): void => {
//   data.sort(sortAsc('price'))
// }

// export const sortPriceDec = (data: Product[]): void => {
//   data.sort(sortDesc('price'))
// }


export function OrderByArray<T, K extends keyof T>(values: T[], orderType: K) {
  return values.sort((a, b) => {
    if (a[orderType] < b[orderType]) {
      return -1;
    }
    if (a[orderType] > b[orderType]) {
      return 1;
    }
    return 0
  })
}

