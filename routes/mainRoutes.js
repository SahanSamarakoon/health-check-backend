const express = require("express");
const router = express.Router();

router.use("/patient", require("./patientRoutes"));
router.use("/doctor",require("./doctorRoutes"));

module.exports = router;
