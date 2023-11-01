import HttpsService from "@/service/httpsService";
import { User, UserSignUp } from "@/types/user";

/**
 * @class UserModel
 * Manages the user data
 */
export default class AuthenModel {
  private userService: HttpsService<User>;
  constructor() {
    this.userService = new HttpsService<User>('users');
  }

  /**
   * @description get all product from server
   * @return list product return after make a GET request to server
   * @param products Products[]
   */
  async handleSignUp(user: UserSignUp): Promise<UserSignUp> {
    const newUser: UserSignUp = {
      email: user.email,
      password: user.password
    }
    return await this.userService.post(newUser as User)
  }

  /**
   * @description get all users account
   * return all users
   * @param user User[]
   */
  async getAllUser(): Promise<User[]> {
    return await this.userService.get();
  }
}
