const Salary = require("../models/salary");
const {sendEmail} = require("../common/mailer")

const acceptConge = async (req, res) => {
    const id = req.params.id;
    
    Salary.findByIdAndUpdate(id, req.body)
      .then(() => {
        res.send({
          message: "nice !",
        });
      })
      .catch((err) => res.status(500).send(err));
  };
  