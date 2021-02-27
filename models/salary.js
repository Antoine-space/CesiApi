const mongoose = require("mongoose");
const validator = require("validator");
const SSN = require("french-ssn");
const bcrypt = require("bcrypt");
const Service = require("../models/service");

const AddrSchema = mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  postCode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
}, { _id : false })

const SalarySchema = mongoose.Schema({
  id_responsable: {
    type: mongoose.Schema.Types.ObjectId,
  },
  firstname :{
    type : String,
    required: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("name cannot be empty");
      }
    },
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("name cannot be empty");
      }
    },
  },
  dateBirth: {
    type : Date,
    required: true
  },
  address : {
    type: AddrSchema,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
        if(!validator.isEmail(value)){
            throw new Error("email is invalid");
        }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
        if(validator.isStrongPassword(value)){
            throw new Error("Password incorect");
        }
    }
  },
  num_secu :{
    type : String,
      require: true,
      validate(value) {
          if (!SSN.validate(value)) {
            throw new Error("Numéro de sécu n'est pas Correct");
          }
        }
  },
  rest_leaves : {
    type : Number,
    Default : null
  } , 
  activeLeaves : {
    type : Boolean,
    Default : false
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Service", 
    required : true
  },
  id_sites: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  }
})

SalarySchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const Salary = mongoose.model("Salary", SalarySchema);

module.exports = Salary;
