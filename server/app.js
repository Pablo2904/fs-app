const express = require("express");
const bodyParser = require("body-parser");

const corsMiddleware = require("./middleware/corsMiddleware");

const articles = require("./routes/articles");
const notFound404 = require("./routes/404");
const settings = require("./routes/settings");
const login = require("./routes/login");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(corsMiddleware);

app.use("/articles", articles);
app.use("/settings", settings);
app.use("login", login);

app.use(notFound404);

app.listen(PORT, () => {
  console.log(`Serwer Express nasłuchuje na porcie ${PORT}`);
});
