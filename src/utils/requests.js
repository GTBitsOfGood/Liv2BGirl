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

export const authedGetRequest = (url, cookies) => {
  const conditionals = {};

  if (cookies != null) {
    conditionals.headers = {
      cookie: cookies,
    };
  }

  return fetch(url, {
    method: "GET",
    mode: "same-origin",
    credentials: "include",
    ...conditionals,
  });
};

export const authedPostRequest = (url, body, cookies) => {
  const conditionals = {};

  if (cookies != null) {
    conditionals.headers = {
      cookie: cookies,
    };
  }

  return fetch(url, {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    ...conditionals,
  });
};
