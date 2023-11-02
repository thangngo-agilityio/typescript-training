export interface User {
  id: number;
  email: string;
  password: string;
}

export interface UserSignUp {
  email: string;
  password: string;
  confirmPassword?: string;
}

export type UserSignIn = Omit<User, 'id'>;
