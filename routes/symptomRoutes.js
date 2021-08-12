const express = require("express");
const symptomRouter = express.Router();
const auth = require("../middlewares/auth");
const {getAllSymptoms,addSymptom,getDisease} = require("../controller/symptomController");

symptomRouter.get("/",getAllSymptoms);
symptomRouter.post("/",addSymptom);
symptomRouter.get("/disease",getDisease);


module.exports = symptomRouter;