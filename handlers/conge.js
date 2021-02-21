const Conge = require("../models/conge");

const createConge = async (req, res) => {
    const conge = new Conge(req.body);
    try {
      await conge.save();
      res.status(201).send(conge);
    } catch (err) {
      res.status(400).send(err);
    }
  };


const listConges = async (_, res) => {
  try {
    let conges = await Conge.find();
    res.send(conges);
  } catch (err) {
    res.status(500).send(err);
  }
};


const getCongeByID = async (req, res) => {
  const id = req.params.id;
  try {
    let conge = await Conge.findById(id);
    if (!conge) {
      return res.status(404).send({
        message: "user not found",
      });
    }
    res.send(conge);
  } catch (err) {
    res.status(500).send(err);
  }
};

const findByValidationDate =  async (req,res) => {
  const date = req.params.date;
  try {
    let conge = await Conge.find({
      "validator.date" : date 
    });
    res.send(conge);
  } catch (error) {
    res.status(500).send(err);
  }
};

  module.exports = {
    createConge,
    listConges,
    getCongeByID,
    findByValidationDate
  };