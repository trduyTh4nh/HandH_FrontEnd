export interface IUserAddress {
  _id?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  apartmentNumber?: string;
}

export interface IUser {
  _id?: string;
  email?: string;
  password?: string;
  name?: string;
  birthDay?: string;
  phone?: string;
  userAddress?: IUserAddress;
  role?: string;
  avatar?: string;
}
