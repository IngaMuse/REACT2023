export interface CardsProps {
  totalPages: number;
  cards: ICard[] | [];
}

export interface CardProps {
  info: ICard | null;
  details: boolean;
}

export interface ICard {
  id: number;
  firstName: string;
  lastName: string;
  age: string;
  birthDate: string;
  height: string;
  weight: string;
  gender: string;
  image: string;
  username?: string;
  email?: string;
  phone?: string;
  bloodGroup?: string;
  eyeColor?: string;
}

export interface CardsResponse {
  users: ICard[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetCardsResponse {
  cards: ICard[];
  totalPages: number;
}

export interface ServerSide {
  cards: CardsProps;
  details: ICard | null;
}

export interface GetCardResponse {
  card: ICard;
}
