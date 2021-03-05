const express = require("express");


const {
    getALLSalaryResponsable
  } = require("../../handlers/responsable");

const router = new express.Router();

router
    .route("/responsable/:id")
    .get(getALLSalaryResponsable);

module.exports = router