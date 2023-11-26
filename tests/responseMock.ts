import { ServerSide } from "@/types/card.types";
import { cardsMock } from "./cardsMock";
import { cardMock } from "./cardMock";

export const responseMock: ServerSide = {
  cards: {
    cards: cardsMock,
    totalPages: 1,
  },
  details: null,
};

export const responseDetailsMock: ServerSide = {
  cards: {
    cards: cardsMock,
    totalPages: 1,
  },
  details: cardMock,
};
