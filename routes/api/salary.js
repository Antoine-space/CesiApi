const express = require("express");

const {
  createUser,
  getUserByID,
  listUsers,
  deleteAllUsers,
  updateUser,
  updateAddrUser,
} = require("../../handlers/salary");
const { isAuth, isRH } = require("../../middleware/auth");

const router = new express.Router();

router
    .route("/salaries")
    .get(listUsers)
    .post(createUser)
    .delete(deleteAllUsers);

router.
    route("/salaries/me")
    .get(isAuth, getUserByID);

router
    .route("/salaries/:id")
    .get(getUserByID)
    .put(updateUser);

router
      .route("/salaries/:id/address")
      .put(updateAddrUser);

module.exports = router