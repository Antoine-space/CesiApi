const express = require("express");
const {
  createService,
  deleteServiceByID,
  updateService,
  byID,
  getAllServices
} = require("../../handlers/service");

const router = new express.Router();

router
    .route("/services")
    .post(createService)
    .delete(deleteServiceByID)
    .put(updateService)
    .get(getAllServices);

router 
    .route("/services/:id")
    .get(byID(false));
    
router 
    .route("/services/:id/populate")
    .get(byID(true));


module.exports = router;