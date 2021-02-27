const Salary = require("../models/salary");
const bcrypt = require("bcrypt");
const {sendEmail} = require("../common/mailer")


const createUser = async (req, res) => {
  
  try {
    const salary = new Salary(req.body);
    await salary.save();
    await salary.sendEmail();
    res.status(201).send(salary);
  } catch (err) {
    res.status(400).send(err);
  }
};

const listUsers = async (_, res) => {
  try {
    let salary = await Salary.find();
    res.send(salary);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUserByID = async (req, res) => {
  const id = req.params.id;
  try {
    let salary = await Salary.findById(id);
    if (!salary) {
      return res.status(404).send({
        message: "user not found",
      });
    }
    res.send(salary);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteAllUsers = async (_, res) => {
  try {
    await Salary.deleteMany();
    res.send({
      message: "deleted",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  if (!checkKeys(req.body, ["firstname", "lastname" ,"dateBirth", "email" ])) {
    return res.status(400).send({
      error: "invalid keys",
    });
  }

  try {
    await Salary.findByIdAndUpdate(id, req.body);
    res.send({
      message: `user ${id} updated`,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateAddrUser = async (req, res) => {
  const id = req.params.id;
  if (!checkKeys(req.body, ["address"])) {
    return res.status(400).send({
      error: "invalid keys",
    });
  }
  Salary.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.send({
        message: "nice !",
      });
    })
    .catch((err) => res.status(500).send(err));
};




function checkKeys(body, allowedKeys) {
  const updatesKeys = Object.keys(body); // => ["name", "age"]
  return updatesKeys.every((key) => allowedKeys.includes(key));
}

module.exports = {
  createUser,
  getUserByID,
  listUsers,
  deleteAllUsers,
  updateUser,
  updateAddrUser,
};
