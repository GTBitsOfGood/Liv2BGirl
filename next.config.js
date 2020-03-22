const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const dotEnv = require("dotenv");

const prod = process.env.NODE_ENV === "production";

if (!prod) {
  dotEnv.config();
} else {
  // eslint-disable-next-line no-console
  console.log("Using env vars: ", process.env);
}

module.exports = withSass(
  withCss(
    withImages({
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
    })
  )
);
