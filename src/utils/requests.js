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
