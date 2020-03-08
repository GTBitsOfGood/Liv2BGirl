const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const dotEnv = require("dotenv");

const prod = process.env.NODE_ENV === "production";

if (!prod) {
  dotEnv.config();
}

module.exports = withSass(
  withCss(
    withImages({
      env: {
        MONGO_DB: process.env.MONGO_DB,
        JWT_SECRET: process.env.JWT_SECRET,
      },
    })
  )
);
