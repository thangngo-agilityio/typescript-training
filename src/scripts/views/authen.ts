import { getElementById, querySelector } from "@/helpers/doms";
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


}
