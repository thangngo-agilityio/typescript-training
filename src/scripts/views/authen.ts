import { AUTHEN_MESSAGE } from "@/constants/message";
import { getElementById, querySelector } from "@/helpers/doms";
import { isEmpty } from "@/helpers/empty";
import { clearError, removeErrorMessage, showError } from "@/helpers/validators/formError";
import { authenValidator } from "@/helpers/validators/validateAuthen";
import { FormType } from "@/types/formTypes";
import { UserSignIn } from "@/types/user";

/**
 * @class LoginView
 *
 * Manages view data user
 */
export default class AuthenView {
  private loginForm: HTMLFormElement;
  private emailElement: HTMLInputElement;
  private passwordElement: HTMLInputElement;
  private confirmPasswordElement: HTMLInputElement;
  private inputGroupElement: HTMLDivElement;
  private btnLoginElement: HTMLButtonElement;
  private btnRegisterElement: HTMLButtonElement;
  private btnSubmitElement: HTMLButtonElement;
  private titleAuthen: HTMLTitleElement;
  private signInEvent: ((user: UserSignIn) => Promise<void>) | null;
  private signUpEvent: ((user: UserSignIn) => Promise<void>) | null;
  constructor() {
    this.loginForm = querySelector<HTMLFormElement>('#form-login');
    this.emailElement = getElementById<HTMLInputElement>('email');
    this.passwordElement = getElementById<HTMLInputElement>('password');
    this.confirmPasswordElement = getElementById<HTMLInputElement>('confirmPassword');
    this.inputGroupElement = querySelector<HTMLDivElement>('.input-group.hidden');
    this.btnLoginElement = querySelector<HTMLButtonElement>('.header-action-signIn');
    this.btnRegisterElement = querySelector<HTMLButtonElement>('.header-action-register');
    this.btnSubmitElement = querySelector<HTMLButtonElement>("[type='submit']");
    this.titleAuthen = querySelector<HTMLTitleElement>('#title-auth');
    this.signInEvent = null;
    this.signUpEvent = null;
  }

  /**
   * @description get value form sign in
   */
  formSignInEventHandler = async (e: SubmitEvent) => {
    e.preventDefault();
    removeErrorMessage();


    const user = {
      email: this.emailElement.value.trim() && this.emailElement.value.toLowerCase() || '',
      password: this.passwordElement.value.trim() || '',
    };
    const isError = authenValidator(user, FormType.SIGNIN);

    if (!isEmpty(isError)) {
      showError(isError);
      this.popup.error({
        message: AUTHEN_MESSAGE.LOGIN_ERROR
      })
    } else {
      if (this.signInEvent) {
        clearError()
        await this.signInEvent(user)
        this.popup.success({
          message: AUTHEN_MESSAGE.LOGIN_SUCCESS
        })
      }
    }
  }
}
