const express = require("express");
const router = express.Router();

const Student = require("../models/Student.model.js")

//Students------------------------------

router.post("/", async(req, res, next)=>{
  try{
    const response = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      cohort: req.body.cohort,
      projects: req.body.projects
    })

    res.status(201).json(response)

  }catch(error){
    next(error)
  }
})


router.get("/", async(req, res, next) => {
    try {
      const response = await Student.find().populate("cohort")
      res.status(200).json(response);
    }
    catch (error){
      next(error)
    };
});


router.get("/cohort/:cohortId", async(req, res, next) => {
  try {
    const response = await Student.find({cohort: req.params.cohortId}).populate("cohort")
    res.status(200).json(response)
  }catch(error){
    next(error)
  }
})


router.get("/:studentId", async(req, res, next) => {
  try {
    const response = await Student.findById(req.params.studentId).populate("cohort")
    res.status(200).json(response)
  }catch(error){
    next(error)
  }
})

router.put("/:studentId", async(req, res, next) => {
  try{
    const response = await Student.findByIdAndUpdate(req.params.studentId,{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      cohort: req.body.cohort,
      projects: req.body.projects
    },{new: true})

    res.status(202).json(response)
  }catch(error){
    next(error)
  }
})


router.delete("/:studentId", async(req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId)
    res.sendStatus(202)
  }catch(error){
    next(error)
  }
})

module.exports = router