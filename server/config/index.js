const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

function configs(app) {
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
}

module.exports = configs