import fetch from "isomorphic-unfetch";

export const authedFetch = (url, options, cookies) => {
  const conditionals = {};

  if (
    Object.prototype.hasOwnProperty.call(options, "headers") &&
    cookies != null
  ) {
    conditionals.headers = {
      ...options.headers,
      cookie: cookies,
    };
  } else if (cookies != null) {
    conditionals.headers = {
      cookie: cookies,
    };
  }

  return fetch(url, {
    ...options,
    ...conditionals,
  });
};

export const authedGetRequest = (url, cookies) =>
  authedFetch(
    url,
    {
      method: "GET",
      mode: "same-origin",
      credentials: "include",
    },
    cookies
  );

export const authedPostRequest = (url, body, cookies) =>
  authedFetch(
    url,
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
    cookies
  );
