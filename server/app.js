require("dotenv").config();
const express = require("express");
const app = express();
const configs = require("./config")
const helmet = require("helmet") //!

configs(app)
require("./db")
app.use(    //!
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'"],
      },
    },
  })
);

const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

const errorHandling = require("./error")
errorHandling(app)

const PORT = process.env.PORT || 5005;

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});