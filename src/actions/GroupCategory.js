import { authedGetRequest } from "../utils/requests";
import urls from "../../utils/urls";

export const getCategories = (cookies) =>
  authedGetRequest(urls.baseUrl + urls.api.category.getCategories(), cookies)
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
