const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./routes/index');

app.get("/", (request, response, next) => {
  return response.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/404", routes.notFound);
app.post("/create", routes.create);
app.get("/:shortPath", routes.resolve);

app.use((request, response, next) => {
  return response.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
