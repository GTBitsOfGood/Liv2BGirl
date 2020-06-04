import { authedFetch } from "../utils/requests";
import urls from "../../utils/urls";

export const getCategories = cookies =>
  authedFetch(
    urls.baseUrl + urls.api.categories.getCategories(),
    {
      method: "GET",
      mode: "same-origin",
      credentials: "include",
    },
    cookies
  )
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
