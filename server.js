const express = require("express");
const compression = require("compression");
const next = require("next");
const cookieParser = require("cookie-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();
const port = process.env.PORT || 8080;

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(compression());
    server.use(cookieParser());

    server.all("*", (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
