const Salary = require("../models/salary");
const bcrypt = require("bcrypt");
const {sendEmail} = require("../common/mailer");
const { default: validator } = require("validator");
const {  } = require("../common/mailer")

//POST
const createUser = async (req, res) => {
  
  try {
    const salary = new Salary(req.body);
    await salary.save();
    await sendEmail();
    console.log('test');
    res.status(201).send(salary);
  } catch (err) {
    res.status(400).send(err);
  }
};


//GET
const listUsers = async (req, res) => {
  try {
    let salary = await Salary.find();
    
    if (!salary) {
      return res.status(404).send({
        message: "salary not found",
      });
    }
    res.send(salary);
  } catch (err) {
    res.status(400).send({
      message: "Impossible to get all salaries",
      error: err,
    });
  }
};
//Pas utilisé
const getUserByID = async (req, res) => {
  const id = req.params.id;
  const populate = parseInt(req.query.populate);
  let salary;
  try {
    if (populate) {
      salary = await Salary.findById(id)
        .populate("service")
    } else {
      salary = await Salary.findById(id);
    }

    if (!salary) {
      throw "None ID SALARY";
    }

    res.send(salary);
  } catch (err) {
    res.status(400).send({
      message: `Error : can't get employee with id (${id}) `,
      error: err,
    });
  }
};


const getMe = async (req, res) => {
  const id = req.params.id;
  let salary;
  try {

      salary = await Salary.findById(id)
        .populate("service")
    if (!salary) {
      throw "None ID SALARY";
    }

    res.send(salary);
  } catch (err) {
    res.status(400).send({
      message: `Error : can't get employee with id (${id}) `,
      error: err,
    });
  }
};

//DELETE
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

const deleteSalary = async (req, res) => {
  const id = req.params.id;
  try {
    salary = await Salary.findById(id);
    if (!salary) {
      throw "Invalid salary id";
    }
    salary.remove();

    res.send({
      message: `salary deleted`,
    });
  } catch (err) {
    res.status(400).send({
      message: `Error : can't delete salary with id (${id})`,
      error: err,
    });
  }
};


//UPDATE
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

const updatePasswordSalary= async (req, res) => {
  const id = req.params.id;
  try {
    if (!checkKeys(req.body, ["password"])) {
      throw "Invalid keys";
    }

    salaries = await Salary.findById(id);
    if (!salaries) {
      throw "Invalid employee id";
    }

    updateKeys = Object.keys(req.body);
    updateKeys.forEach((key) => (salaries[key] = req.body[key]));

    await salaries.save();
  } catch (err) {
    res.status(400).send({
      message: `Error : can't updated (${id}) salaries password`,
      error: err,
    });
  }
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
  updatePasswordSalary,
  deleteSalary,
  getMe
};
