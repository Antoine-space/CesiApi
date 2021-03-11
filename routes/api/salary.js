const express = require("express");

const {
    createUser,
    getUserByID,
    listUsers,
    deleteSalary,
    updateUser,
    updateAddrUser,
    updatePasswordSalary,
    getMe,
    
} = require("../../handlers/salary");
const { isAuth, isRH } = require("../../middleware/auth");

const router = new express.Router();

router
    .route("/salaries")
    .get(listUsers)
    .post(createUser)
    .delete(deleteSalary)
    

router.
    route("/salaries/me")
    .get(isAuth, getMe);

router.
    route("/salaries/me")
    .get(isAuth, getMe);

router
    .route("/salaries/:id")
    .get(getUserByID)
    .put(updateUser);

router
      .route("/salaries/:id/address")
      .put(updateAddrUser);
      

router
        .route("/salaries/password/:id")
        .put(updatePasswordSalary);

module.exports = router