const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    department:{
        type:String,
        enum:["Marketing","Tech","Operations"]
    } 
  },
  {
    versionKey: false,
  }
);

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = {
    employeeModel,
};
