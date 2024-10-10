const express = require("express");
const router = express.Router();

const Cohort = require("../models/Cohort.model.js")



//Cohorts-------------------------------------------
router.get("/", async (req, res, next) => {
  Cohort.find({})
    try{
      const cohorts = await Cohort.find()
      res.status(200).json(cohorts);
    } catch(error){
      next(error)
    }

});

router.post("/", async(req, res, next) => {
  try {
    const response = await Cohort.create({
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      format: req.body.format,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours
    })
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
})

router.get("/:cohortId", async(req, res, next) => {
  try {
    const response = await Cohort.findById(req.params.cohortId)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

router.put("/:cohortId", async(req, res, next) => {
  try{
    const response = await Cohort.findByIdAndUpdate(req.params.cohortId,{
      inProgress: req.body.inProgress,
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      format: req.body.format,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours
    },{new: true})

    res.status(202).json(response)
  }catch(err){
    next(error)
  }
})

router.delete("/:cohortId", async(req, res, next) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId)
    res.sendStatus(202)
  }catch(error){
    next(error)
  }
})

module.exports = router