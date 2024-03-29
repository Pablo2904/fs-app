const swaggerJsdoc = require("swagger-jsdoc");
const express = require("express");
const swaggerUi = require("swagger-ui-express");

const router = express.Router();

const setupSwagger = () => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Fullstack API",
        version: "0.0.1",
      },
      servers: [
        {
          url: "http://localhost:5000",
        },
      ],
    },
    apis: ["./routes/*.js"], // Path to the API docs
  };

  const openapiSpecification = swaggerJsdoc(options);
  router.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(openapiSpecification)
  );

  return router;
};

module.exports = setupSwagger;
