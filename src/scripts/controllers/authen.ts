import AuthenModel from "@/models/authen";
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
  }
}
