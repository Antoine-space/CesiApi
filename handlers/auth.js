const Salary = require("../models/salary");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const Service = require('../models/service');
const { byID } = require("./service");

const login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  try {
    let salary = await Salary.findOne({
      email: email,
    }).populate("service");
    if (!salary) {
      res.status(401).send("email");
    }

    let match = await bcrypt.compare(password, salary.password);
    if (!match) {
      return res.status(401).send(err);
    }


    var token = jwt.sign({
        user_id: salary.id,
        service: salary.service.name
    }, process.env.SECRET_JWT, {expiresIn: 60*60});


    res.send({
      token: token,
      salary: salary
    });
  } catch (error) {
    res.status(401).send("Email ou mot de passe incorrect");
  }
};


const logout = async (req, res) => {
  try {
    const token = req.body.token;
    token = "";
    res.send({
      token: token,
    });
  } catch (error) {
    res.status(401).send("Impossible de se déconnecté");
  }
};

module.exports = { login, logout };
