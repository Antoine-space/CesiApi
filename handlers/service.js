const Salary = require("../models/salary");
const Service = require("../models/service");

const createService = async (req, res) => {
  const service = new Service(req.body);
  try {
    await service.save();
    res.status(201).send(service);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteServiceByID = async (req, res) => {
  const id = req.params.id;
  try {
    let service = await Service.deleteOne(id);
    if (!service) {
      return res.status(404).send({
        message: "service not found",
      });
    }
    res.send({
      message: "deleted",
    });
  } catch (error) {
    res.status(500).send(error);
  }
  
};

const updateService = async (req, res) => {
  const id = req.params.id;
  if (!checkKeys(req.body, ["NameService", "lvlRight"])) {
    return res.status(400).send({
      error: "invalid keys",
    });
  }
  try {
    await Salarie.findByIdAndUpdate(id, req.body);
    res.send({
      message: `Service ${id} updated`,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const byID = (populate) => {
  return async (req, res) => {
    const id = req.params.id;
    let service;
    try {
      if(populate)
      {
        service = await Service.findById(id).populate("responsable");
      }
      else{
        service = await Service.findById(id);
      }
      if (!service) {
        res.status(404).send();
      }
      res.send(service);
    } 
    catch (error) {
      res.status(500).send(error);
    }
  };
};

const getAllServices = async(req, res) => {
  const populate = parseInt(req.query.populate);
  let services;
  try {
    if (populate) {
      services = await Service.find().populate("responsable");
    } else {
      services = await Service.find();
    }
    res.send(services);
  } catch (err) {
    res.status(400).send({
      message: "Error c'ant get all services",
      error: err,
    });
  }
},


function checkKeys(body, allowedKeys) {
  const updatesKeys = Object.keys(body); // => ["NameService", "age"]
  return updatesKeys.every((key) => allowedKeys.includes(key));
}

module.exports = {
    createService,
    deleteServiceByID,
    updateService,
    byID,
    getAllServices
  };