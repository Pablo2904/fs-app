const express = require("express");
const bodyParser = require("body-parser");

const corsMiddleware = require("./middleware/corsMiddleware");
const setupSwagger = require("./middleware/swaggerMd");

const articles = require("./routes/articles");
const notFound404 = require("./routes/404");
const login = require("./routes/login");
const users = require("./routes/users");

require("dotenv").config("../.env");
const { PORT, NODE_ENV } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(setupSwagger());
app.use(corsMiddleware);

app.use("/articles", articles);
app.use("/login", login);
app.use("/users", users);
app.use(notFound404);

app.listen(PORT, () => {
  console.log("");
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log(`Serwer Express nasłuchuje na porcie ${PORT}`);
  console.log(`Tryb: ${NODE_ENV}`);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
  console.log("");
});
