import { TOGGLE_STATUS } from "@/constants/common";
import { isRedirect } from "@/helpers/redirect";
import { handleToggleLoading } from "@/helpers/toggle";
import AuthenModel from "@/models/authen";
import { User, UserSignIn, UserSignUp } from "@/types/user";
import AuthenView from "@/views/authen";

/**
 * @class UserController
 * Link the user input and the view output for add edit delete data
 * @param model
 * @param view
 */
export default class AuthenController {
  model: AuthenModel;
  view: AuthenView;
  constructor(model: AuthenModel, view: AuthenView) {
    this.model = model;
    this.view = view;
    this.init();
  }

  init(): void {
    this.view.displayLogin(this.signIn, this.signUp);
  }

  signIn = async (user: UserSignIn): Promise<void> => {
    handleToggleLoading(TOGGLE_STATUS.isShown);
    const dataUser: User[] = await this.model.getAllUser();
    const foundUser = this.findUser(dataUser, user.email, user.password);

    if (foundUser) {
      localStorage.setItem('LOGIN', foundUser.id.toString());
      isRedirect('/');
    }
    handleToggleLoading(TOGGLE_STATUS.isHidden);
  }

  signUp = async (user: UserSignUp): Promise<void> => {
    const dataUser: User[] = await this.model.getAllUser();
    const foundUser = this.findUser(dataUser, user.email);

    if (foundUser) {
      this.view.popupSignupError(foundUser);
    } else {
      handleToggleLoading(TOGGLE_STATUS.isShown);
      const dataUserSignup = await this.model.handleSignUp(user) as User;
      this.view.popupSignupSuccess();
      localStorage.setItem('LOGIN', dataUserSignup.id);
      setTimeout(() => {
        isRedirect('/authen.html');
      }, 1000);
      handleToggleLoading(TOGGLE_STATUS.isHidden);
    }
  }

  findUser = (dataUser: User[], email: string, password?: string) => {
    if (password) {
      return dataUser.find(
        (data) => data.email === email && data.password === password
      );
    } else {
      return dataUser.find((data) => data.email === email);
    }
  }
}
