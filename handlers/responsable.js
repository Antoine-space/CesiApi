const Salary = require("../models/salary");
const Conge = require("../models/conge");
const {sendEmail} = require("../common/mailer")


const getSalaryReponsable= async (req,res) => {
  const id = req.params.id;
  try {
    let salaries = await Salary.find({ id_responsable : id});
    if (!salaries) {
      return res.status(404).send({
        message: "les salariés du responsable sont introuvables",
      });
    }
    res.send(salaries);
  } catch (err) {
    res.status(500).send(err);
  }
};
  
const getALLCongéofSalaryofResponsable = async (req,res) => {
  const id = req.params.id;
  try {
    let salaries = await Salary.find({ id_responsable : id});
    if (!salaries) {
      return res.status(404).send({
        message: "les salariés du responsable sont introuvables",
      });
    }
    array = []
    for ( const salary of salaries) {
      let conge = await Conge.find({ salary: salary._id });
      await array.push(conge);
    };
    console.log(array);
    res.send(array);
  } catch (err) {
    res.status(500).send(err);
  }
};


module.exports = {
  getSalaryReponsable,
  getALLCongéofSalaryofResponsable,
};