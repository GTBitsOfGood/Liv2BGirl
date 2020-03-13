const withImages = require("next-images");
const dotEnv = require("dotenv");

const prod = process.env.NODE_ENV === "production";

if (!prod) {
  dotEnv.config();
}

module.exports = withImages({
  env: {
    MONGODB: process.env.MONGODB,
    JWTSECRET: process.env.JWTSECRET,
  },
});
