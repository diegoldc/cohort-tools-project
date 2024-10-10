require("dotenv").config();
const express = require("express");
const app = express();
const configs = require("./config")

configs(app)
require("./db")

const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

const errorHandling = require("./error")
errorHandling(app)

const PORT = process.env.PORT || 5005;

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});