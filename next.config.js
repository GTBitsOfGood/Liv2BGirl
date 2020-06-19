const withImages = require("next-images");
const dotEnv = require("dotenv");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const prod = process.env.NODE_ENV === "production";

if (!prod) {
  dotEnv.config();
}

module.exports = withImages({
  env: {
    BASE_URL: process.env.BASE_URL,
    MONGODB: process.env.MONGODB,
    JWTSECRET: process.env.JWTSECRET,
  },
  build: {
    env: {
      BASE_URL: process.env.BASE_URL,
      MONGODB: process.env.MONGODB,
      JWTSECRET: process.env.JWTSECRET,
    },
  },
  webpack: (config) => {
    config.plugins.push(new CaseSensitivePathsPlugin());

    return config;
  },
});
