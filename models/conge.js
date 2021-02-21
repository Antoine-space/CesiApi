const mongoose = require("mongoose");
const validator = require("validator");

const congeSchema = mongoose.Schema({


salary: {type : mongoose.Schema.Types.ObjectId,
           required: true},

 ask_at: {
      type : Date
 },


  startDate: {
    type: Date,
    required: true,/*
    validate(value) {
        if (!validator.isAfter(value) || !validator.isBefore(value, endDate) || !isDate(value) ) {
          throw new Error("La date de début est invalide");
        }
      },*/
  },

  endDate: {
    type: Date,
    required: true,/*
    validate(value) {

        if (!validator.isAfter(value) || !validator.isAfter(value, startDate) || !isDate(value)) {
          throw new Error("La date de fin est invalide");
        }
      }*/
  },

  comment: {
    type : String
  },

  state: {
    type: String,
    enum : ["pending" , "date_accepted" , "refused" , "accepted"],
    default: 'pending'

},
 
  validator: {
    firstname: String,
    lastname: String,
    date: Date,
  },
})

const conge = mongoose.model("Conges", congeSchema);

module.exports = conge;
