const withImages = require("next-images");
const dotEnv = require("dotenv");

const prod = process.env.NODE_ENV === "production";

if (!prod) {
  dotEnv.config();
}

const base = withImages({
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

if (!prod) {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: !prod && process.env.ANALYZE === "true",
  });

  module.exports = withBundleAnalyzer(base);
} else {
  module.exports = base;
}
