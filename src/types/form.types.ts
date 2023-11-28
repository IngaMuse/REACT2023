export type FormValues = {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
  passwordRepeat: string;
  gender: string;
  accept: string;
  image: FileList;
  country: string;
};

export type FormErrors = {
  [PropertyKey in keyof FormValues]: {
    type: string;
    message: string;
  };
};

export interface ICards {
  cards: ICard[];
}

export interface CardProps {
  info: ICard;
}

export type ICard = {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  image: string;
  country: string;
};
