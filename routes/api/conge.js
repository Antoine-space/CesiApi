const express = require("express");

const {
  createConge,
  listConges,
  getCongeByID,
  findByValidationDate,
  updateConge,
  updateStateConge
} = require("../../handlers/conge");

const router = new express.Router();

router
    .route("/conges")
    .get(listConges)
    .post(createConge)

router 
    .route("/conges/validation-date/:date")
    .get(findByValidationDate)

router
    .route("/conges/:id")   
    .get(getCongeByID)
    .put(updateConge)

router
    .route("/conges/:id/state")
    .put(updateStateConge)
    
module.exports = router