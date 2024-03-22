const cors = require("cors");

const isProduction = process.env.NODE_ENV === "production";

const corsOptions = isProduction
  ? {
      origin: "https://google.com",
    }
  : {};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
