export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface User {
  _id: string;
  username: string;
  phone: string;
  nickname: string;
  token: string;
}

export interface GlobalError {
  error: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export interface RegisterMutation {
  username: string;
  password: string;
  nickname: string;
  phone: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface Category {
  _id: string;
  title: string;
  description: string;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  owner: User;
}

export interface ItemMutation {
  category: string;
  title: string;
  description: string;
  price: string;
  image: File | null;
}
