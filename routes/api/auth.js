const express = require("express");
const {
    login
} = require("../../handlers/auth");

const router = new express.Router();

router
    .route("/auth/login")
    .post(login)

module.exports = router