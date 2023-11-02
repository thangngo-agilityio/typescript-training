import { UserSignIn, UserSignUp } from "@/types/user";
import { validateConfirmPassword, validateEmail, validatePassword } from "./validateInput";
import { FormError, FormType } from "@/types/form";

/**
 * @description handle validate form sign in
 * @param user
 * @returns {FormError} errors object
 */
export const validateFormSignIn = (user: Partial<UserSignIn >) => {
  const error: FormError = {
    ...(validateEmail(user.email) && {
      email: validateEmail(user.email)
    }),
    ...(validatePassword(user.password) && {
      password: validatePassword(user.password),
    }),
  };

  return error;
}

/**
 * @description handle validate form sign up
 * @param user
 * @returns {FormError} errors object
 */
export const validateFormSignUp = (user: Partial<UserSignUp>) => {
  const error: FormError = {
    ...(validateEmail(user.email) && {
      email: validateEmail(user.email)
    }),
    ...(validatePassword(user.password) && {
      password: validatePassword(user.password),
    }),
    ...(validateConfirmPassword(user.password, user.confirmPassword) && {
      confirmPassword: validateConfirmPassword(user.password, user.confirmPassword),
    })
  };
  return error
}

export const authenValidator = (user: Partial<UserSignUp>, type: FormType): FormError => {
  switch (type) {
    case FormType.SIGNUP:
      return validateFormSignUp(user);
    case FormType.SIGNIN:
      return validateFormSignIn(user);
    default:
      return {};
  }
}
