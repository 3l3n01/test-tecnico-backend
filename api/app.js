const express = require("express");
const bodyParser = require("body-parser");
const decodeJson = require("./middlewares/decodeJson");
const swaggerUi = require('swagger-ui-express');
const docApi = require('./docs/api.json');
const statusMonitor = require('express-status-monitor')();

const app = express();


// Controladores
const Donations = require('./controllers/donations.controllers');

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization, Cache-Control, Pragma"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  if (req.method === "OPTIONS") {
    return res.end();
  }
  next();
});

app.use(statusMonitor);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(decodeJson.decode);

app.use('/api/donations', Donations);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(docApi));
app.get('/health/status', statusMonitor.pageRoute);

app.use(function (req, res, next) {
  res.status(404);
  res.json({ error: "Not found" });
  return;
});

module.exports = app;
