const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/docs", (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "../views/docs.html"));
  
});

router.get('/', (req, res, next) => {
  res.sendStatus(200);
});

const studentRouter = require("./student.routes.js")
router.use("/students", studentRouter)

const cohortRouter = require("./cohort.routes.js")
router.use("/cohorts", cohortRouter)

const authRouter=require("./auth.routes")
router.use("/auth", authRouter)

const userRouter = require("./user.routes.js")
router.use("/users", userRouter)



module.exports = router