const mongoose = require("mongoose");


const DB = process.env.MONGO_PASSWORD
mongoose.connect(DB).then(()=>{
  console.log("connected to db")
});