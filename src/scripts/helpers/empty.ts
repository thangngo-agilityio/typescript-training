import { FormError } from "@/types/form";

export const isEmpty = (object: FormError): boolean => {
  return Object.keys(object).length === 0;
}
