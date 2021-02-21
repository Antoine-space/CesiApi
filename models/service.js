const mongoose = require("mongoose");



const ServiceSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
        
    },
    lvlRight:{
        type : Number
    },
    responsable: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Salary"
    }
});

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;