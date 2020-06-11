import { generateUsernames } from "../../../actions/User";

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 */
const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const descriptions = [
  "Kind",
  "Cool",
  "Bubbly",
  "Neat",
  "Brave",
  "Social",
  "Eager",
  "Giving",
  "Shy",
  "Friendly",
];

export const favThings = [
  "Dogs",
  "Biking",
  "Bowling",
  "Reading",
  "Sports",
  "Skating",
  "Cats",
  "Movies",
  "Birds",
  "Running",
];

export const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const randomDescription = () =>
  descriptions[getRandom(0, descriptions.length - 1)];

export const randomThing = () => favThings[getRandom(0, favThings.length - 1)];

export const randomNumber = () => numbers[getRandom(0, numbers.length - 1)];
