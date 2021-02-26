
const express = require("express");
const {
    resetPassword, ValidPasswordToken, NewPassword
} = require("../../handlers/resetPassword");
const { isAuth } = require("../../middleware/auth");

const router = new express.Router();


router.route('/req-reset-password')
                .post(isAuth, resetPassword)
router.route('/new-password')
                .post(isAuth, NewPassword)
router.route('/valid-password-token')
                .post(isAuth, ValidPasswordToken)