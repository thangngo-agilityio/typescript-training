import { Product } from "@/types/product";
import { validateImage, validateName, validatePrice, validateQuantity } from "./validateInput";

/**
 * @description handle validate form product
 * @param product
 */
export const validateForm = (product: Partial<Product>) => {
  const error = {
    ...(validateName(product.name) && {
      name: validateName(product.name),
    }),
    ...(validatePrice(product.price) && {
      price: validatePrice(product.price),
    }),
    ...(validateImage(product.image) && {
      image: validateImage(product.image),
    }),
    ...(validateQuantity(product.quantity) && {
      quantity: validateQuantity(product.quantity),
    }),
  }

  return error;
}
