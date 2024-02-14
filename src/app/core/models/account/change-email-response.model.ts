export interface ChangeEmailResponseModel {
  user: User;
}

export interface User {
  id: number;
  roleName: string;
  userName: string;
  email: string;
  account: Account;
  created: string;
}

export interface Account {
  photo: string;
  cread: string;
}
