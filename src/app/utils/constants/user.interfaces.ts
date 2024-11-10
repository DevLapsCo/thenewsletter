export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser extends LoginUser {
  firstName: string;
  lastName: string;
}

export interface GeneralId {
  Id: string;
}

export interface UserData {
  imageUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}
