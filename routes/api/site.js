const express = require("express")
const
{
createSites,
getSitesByID,
listSites,
deleteAllSites,
updateSites,
updateAddrSites,
} = require ("../handlers/sites");

const router = new Express.Router();

router
    .route("/sites")
    .get(listSites)
    .post(createSites)
    .delete(deleteAllSites);

router
    .route("/sites/:id")
    .get(getSitesByID)
    .put(updateSites);



module.exports = Sites;
