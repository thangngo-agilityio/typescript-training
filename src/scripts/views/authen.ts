import { AUTHEN_MESSAGE } from "@/constants/message";
import { getElementById, querySelector } from "@/helpers/doms";
import { isEmpty } from "@/helpers/empty";
import { clearError, removeErrorMessage, showError } from "@/helpers/validators/formError";
import { authenValidator } from "@/helpers/validators/validateAuthen";
import { Popup } from "@/templates/popup";
import { FormError, FormType } from "@/types/form";
import { UserSignIn, UserSignUp } from "@/types/user";

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
  private popup: Popup = new Popup()
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

  /**
   * @description get value form sign up
   */
  formSignUpEventHandler = async (e: SubmitEvent) => {
    e.preventDefault();
    removeErrorMessage();
    const user: UserSignUp = {
      email: this.emailElement.value.trim() && this.emailElement.value.toLowerCase() || '',
      password: this.passwordElement.value.trim() || '',
      confirmPassword: this.confirmPasswordElement.value.trim() || '',
    }
    const isError: FormError = authenValidator(user, FormType.SIGNUP);

    if (!isEmpty(isError)) {
      showError(isError);
    } else {
      if (this.signUpEvent) {
        clearError();
        await this.signUpEvent(user)
      }
    }
  }

  popupSignupSuccess = () => {
    this.popup.success({
      message: AUTHEN_MESSAGE.REGISTER_SUCCESS
    });
  }

  popupSignupError = (user: UserSignUp) => {
    if (user) {
      this.popup.error({
        message: AUTHEN_MESSAGE.REGISTER_ERROR
      });
    }
  }

  /**
   * @description bind user sign in form by add event submit for sign in and remove event submit sign up
   */
  bindUserSignIn() {
    this.loginForm.removeEventListener('submit', this.formSignUpEventHandler);
    this.loginForm.addEventListener('submit', this.formSignInEventHandler);
  }

  /**
   * @description bind user sign up form by add event submit for sign up and remove event submit sign in
   */
  bindUserSignUp() {
    this.loginForm.removeEventListener('submit', this.formSignInEventHandler);
    this.loginForm.addEventListener('submit', this.formSignUpEventHandler);
  }

  displayLogin(
    userSingIn: (user: UserSignIn) => Promise<void>,
    userSignUp: (user: UserSignUp) => Promise<void>
  ): void {
    this.signInEvent = userSingIn;
    this.signUpEvent = userSignUp;
    this.bindFormEvent();
  }

  bindFormEvent() {
    this.bindUserSignIn();

    this.btnLoginElement.addEventListener('click', e => {
      e.preventDefault();
      clearError();
      const titlePage = querySelector<HTMLTitleElement>('title')
      titlePage.textContent = 'Sign in'
      this.titleAuthen.textContent = "Sign In"
      this.btnLoginElement.classList.add('active');
      this.btnRegisterElement.classList.remove('active');
      this.loginForm.reset();
      this.inputGroupElement.classList.add('hidden')

      // If submit button has element
      if (this.btnSubmitElement) {
        this.btnSubmitElement.innerHTML = 'Sign In';
      }

      this.bindUserSignIn();
    })
    this.btnRegisterElement.addEventListener('click', e => {
      e.preventDefault();
      clearError();
      const titlePage = querySelector<HTMLTitleElement>('title')
      titlePage.textContent = 'Register'
      this.titleAuthen.textContent = "Create New Account"
      this.btnRegisterElement.classList.add('active');
      this.btnLoginElement.classList.remove('active');
      this.loginForm.reset();
      this.inputGroupElement.classList.remove('hidden')

      // If submit button has element
      if (this.btnSubmitElement) {
        this.btnSubmitElement.innerHTML = 'Sign Up';
      }

      this.bindUserSignUp();
    })
  }
}
