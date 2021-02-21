const express = require("express");
const {
  createService,
  deleteServiceByID,
  updateService,
  byID
} = require("../../handlers/service");

const router = new express.Router();

router
    .route("/services")
    .post(createService)
    .delete(deleteServiceByID)
    .put(updateService)
router 
    .route("/services/:id")
    .get(byID(false));
router 
    .route("/services/:id/populate")
    .get(byID(true));


module.exports = router;