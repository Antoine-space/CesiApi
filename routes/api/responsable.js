const express = require("express");


const {
  getSalaryReponsable,
  getALLCongéofSalaryofResponsable,
  } = require("../../handlers/responsable");

const router = new express.Router();

router
    .route("/responsable/salaries/:id")
    .get(getSalaryReponsable);

router
    .route("/responsable/salaries/:id/conges")
    .get(getALLCongéofSalaryofResponsable);

module.exports = router