import { http, HttpResponse } from "msw";
import { cardsMock } from "./cardsMock";
import { cardMock } from "./cardMock";

export const handlers = [
  http.get("https://dummyjson.com/users/", () => {
    return HttpResponse.json({ cardsMock });
  }),

  http.get("https://dummyjson.com/users/1", () => {
    return HttpResponse.json({ ...cardMock });
  }),
];
