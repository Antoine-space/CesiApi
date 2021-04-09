const Conge = require("../models/conge");
const Salary = require("../models/salary");
const { sendEmail, 
  CongeRequestStatusUpdateToEmployee,
  CongeRequestStatusUpdateToManager,
  NewCongeRequestToRh} = require("../common/mailer");


//POST
const createConge = async (req, res) => {
    const conge = new Conge(req.body);
    try {
      await conge.save();
      
      res.status(201).send(conge);
    } catch (err) {
      res.status(400).send(err);
    }
  };

// Get
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

const getCongeByUser = async (req, res) => {
  const id = req.params.id;
  try {
    if ( id &&! (await Salary.exists({ _id: id }).catch((err) => {throw "Invalid employee id";}))) {
      throw "Invalid employee id";
    }
    congé = await Conge.find({ salary: id });
    res.send(congé);
  } catch (err) {
    res.status(400).send({
      message: "Error when geting a leaves by id",
      error: err,
    });
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

const deleteConge = async(req, res) => {
  const id = req.params.id;
  try {
    conge = await Conge.findById(id);
    if (!conge) {
      throw "Invalid leaves id";
    }
    conge.remove();
    res.send({
      message: `Holiday deleted`,
    });
  } catch (err) {
    res.status(400).send({
      message: "Error when deleting a leaves",
      error: err,
    });
  }
}

//update
const updateConge = async (req,res) => {
  const id = req.params.id;
  if (!checkKeys(req.body, ["startDate", "endDate" ,"comment" ])) {
    return res.status(400).send({
      error: "invalid keys",
    });
  }
  try {
    await Conge.findByIdAndUpdate(id, req.body);Z
    res.send({
      message: `congé ${id} updated`,
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

const updateStateConge = async (req,res) => {
  const id = req.params.id;
  if (!checkKeys(req.body, ["state"])) {
    return res.status(400).send({
      error: "invalid keys",
    });
  }
  try {
    const stateConge = await Conge.findById(id).status;
    const conge = await Conge.findById(id);
    if(!conge)
    {
      throw new Error ("Congé invalide")
    }
    updateKeys = Object.keys(req.body);
    updateKeys.forEach(key => (holiday[key] = req.body[key]));
    await holiday.save();

    res.send({
      message: `State of congé ${id} updated`,
    });

    if(stateConge != req.body.status)
    {
      /*ENVOIE MAIL AU SALARIE */
      CongeRequestStatusUpdateToEmployee(id);
      /*ENVOIE MAIL AU RESPONSABLE */
      CongeRequestStatusUpdateToManager(id);
      if(req.body.status == "date_accepted")
      {
        /* ENVOIE MAIL RH*/
        NewCongeRequestToRh(id)
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
}




function checkKeys(body, allowedKeys) {
  const updatesKeys = Object.keys(body); // => ["name", "age"]
  return updatesKeys.every((key) => allowedKeys.includes(key));
}

  module.exports = {
    createConge,
    listConges,
    getCongeByID,
    getCongeByUser,
    findByValidationDate,
    updateConge,
    updateStateConge,
    deleteConge
  };