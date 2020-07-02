module.exports = {
  apps: [
    {
      script: "app.js",
      watch: ".",
      ignore_watch: ["node_modules", "data"],
    },
  ],
  deploy: {
    production: {
      ref: "origin/master",
      repo: "https://github.com/gtbitsofgood/Liv2BGirl",
      path: ".",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
