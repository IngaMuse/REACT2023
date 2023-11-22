import { http, HttpResponse } from "msw";
import { cardsMock } from "./cardsMock";
import { cardMock } from "./cardMock";

export const handlers = [
  http.get("https://dummyjson.com/users/search", () => {
    const path = window.localStorage.getItem("search");
    if (path != null && !cardsMock.join().includes(path)) {
      return HttpResponse.json({
        users: [],
        total: 0,
        skip: 0,
        limit: 30,
      });
    }

    return HttpResponse.json({
      users: [...cardsMock],
      total: 2,
      skip: 0,
      limit: 30,
    });
  }),

  http.get("https://dummyjson.com/users/1", () => {
    return HttpResponse.json({ ...cardMock });
  }),
];
