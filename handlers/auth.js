const Salary = require("../models/salary");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  try {
    let salary = await Salary.findOne({
      email: email,
    });
    if (!salary) {
      res.status(401).send("email");
    }

    let match = await bcrypt.compare(password, salary.password);
    if (!match) {
      return res.status(401).send(err);
    }

    var token = jwt.sign({
        user_id: salary.id,
        service: "rh"
    }, process.env.SECRET_JWT, {expiresIn: 60*60});


    res.send({
      token: token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { login };
