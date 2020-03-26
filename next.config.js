const withImages = require("next-images");
const dotEnv = require("dotenv");

const prod = process.env.NODE_ENV === "production";

if (!prod) {
  dotEnv.config();
} else {
  // eslint-disable-next-line no-console
  console.log("Using env vars: ", process.env);
}

module.exports = withImages({
  env: {
    MONGODB: process.env.MONGODB,
    JWTSECRET: process.env.JWTSECRET,
  },
  build: {
    env: {
      MONGODB: process.env.MONGODB,
      JWTSECRET: process.env.JWTSECRET,
    },
  },
});
