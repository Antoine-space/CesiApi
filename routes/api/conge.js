const express = require("express");

const {
  createConge,
  listConges,
  getCongeByID,
  findByValidationDate
} = require("../../handlers/conge");

const router = new express.Router();

router
    .route("/conges")
    .get(listConges)
    .post(createConge)

router 
    .route("/conges/validation-date/:date")
    .get(findByValidationDate)
    

module.exports = router