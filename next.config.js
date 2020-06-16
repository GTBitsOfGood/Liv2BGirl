const withImages = require("next-images");
const dotEnv = require("dotenv");

const prod = process.env.NODE_ENV === "production";

if (!prod) {
  dotEnv.config();
}

module.exports = withImages({
  env: {
    BASE_URL: process.env.BASE_URL,
    MONGODB: process.env.MONGODB,
    JWTSECRET: process.env.JWTSECRET,
    TINY_API_KEY: process.env.TINY_API_KEY,
  },
  build: {
    env: {
      BASE_URL: process.env.BASE_URL,
      MONGODB: process.env.MONGODB,
      JWTSECRET: process.env.JWTSECRET,
      TINY_API_KEY: process.env.TINY_API_KEY,
    },
  },
});
