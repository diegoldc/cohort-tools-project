const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 5005;

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));



// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const Cohort = require("./models/Cohort.model.js")
const Student = require("./models/Student.model.js")
// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...


//Students------------------------------

app.post("/api/students", async(req, res)=>{
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

  }catch(err){
    res.status(500).json({message: "Error creating student"})
  }
})


app.get("/api/students", async(req, res) => {
    try {
      const response = await Student.find().populate("cohort")
      res.json(response);
    }
    catch (err){
      res.status(500).json({ error: "Failed to retrieve students" });
    };
});


app.get("/api/students/cohort/:cohortId", async(req, res) => {
  try {
    const response = await Student.find({cohort: req.params.cohortId}).populate("cohort")
    console.log("retrieved students in this cohort", response)
    res.status(200).json(response)
  }catch(err){
    res.status(500).json({ error: "Failed to retrieve students by cohort" });
  }
})


app.get("/api/students/:studentId", async(req, res) => {
  try {
    const response = await Student.findById(req.params.studentId).populate("cohort")
    res.status(200).json(response)
  }catch(err){
    res.status(500).json({ error: "Failed to retrieve this student" });
  }
})

app.put("/api/students/:studentId", async(req, res) => {
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

    res.status(200).json(response)
  }catch(err){
    res.status(500).json({ error: "Failed to edit this student" });
  }
})


app.delete("/api/students/:studentId", async(req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId)
    res.status(200).send("Eliminado con éxito")
  }catch(err){
    res.status(500).json({ error: "Failed to delete this student" });
  }
})


//Cohorts-------------------------------------------
app.get("/api/cohorts", async (req, res) => {
  Cohort.find({})
    try{
      const cohorts = await Cohort.find()
      res.json(cohorts);
    } catch(err){
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    }

});

app.post("/api/cohorts", async(req, res) => {
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
    res.status(500).json({ error: "Failed to create the cohort" });
  }
})

app.get("/api/cohorts/:cohortId", async(req, res) => {
  try {
    const response = await Cohort.findById(req.params.cohortId)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve this cohort" });
  }
})

app.put("/api/cohorts/:cohortId", async(req, res) => {
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

    res.status(200).json(response)
  }catch(err){
    res.status(500).json({ error: "Failed to edit this cohort" });
  }
})

app.delete("/api/cohorts/:cohortId", async(req, res) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId)
    res.status(200).send("Eliminado con éxito")
  }catch(err){

    res.status(500).json({ error: "Failed to delete this cohort" });
  }
})

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});