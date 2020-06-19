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
  },
  build: {
    env: {
      BASE_URL: process.env.BASE_URL,
      MONGODB: process.env.MONGODB,
      JWTSECRET: process.env.JWTSECRET,
    },
  },
  webpack: (config, { dev }) => {
    if (dev) {
      const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

      config.plugins.push(new CaseSensitivePathsPlugin());
    }

    return config;
  },
});
