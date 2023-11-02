import { FormError } from "@/types/form";
import { getElementById, querySelector, querySelectorAll } from "../doms";

/**
 * @description handle show error
 * @param error
 */
export const showError = (error: FormError) => {
  clearError();
  Object.entries(error).forEach(([key, value]) => {
    const target = getElementById<HTMLElement>(`${key}-error`);

    if (target) {
      target.innerHTML = value
    }
  })
}

export const clearError = () => {
  const errorField = querySelectorAll<HTMLElement>('.error-message');
  errorField.forEach((field) => {
    field.innerHTML = ''
  })
}

export const removeErrorMessage = (): void => {
  const formItems = querySelectorAll('.form-input');

  formItems.forEach((item) => {
    const name = item.getAttribute('name')

    name &&
    getElementById<HTMLElement>(name).addEventListener('focus', () => {
      querySelector<HTMLElement>(`#${name}-error`).textContent = '';
    })
  })
};
