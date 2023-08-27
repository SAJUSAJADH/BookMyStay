const mongoose = require("mongoose");
require("../db/connect");





const userSchema = new mongoose.Schema({
  firstname:String,
  lastname:String,
  email:String,
  password:String,
  image:String,
  phone:Number,
  bio:String,
  company:String,
  designation:String
});



const User = mongoose.model('user',userSchema);





module.exports = User;

