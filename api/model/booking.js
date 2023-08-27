const mongoose = require('mongoose');



const bookingSchema = new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, ref:'Place'},
    user: {type:mongoose.Schema.Types.ObjectId},
    checkin:Date,
    checkout:Date,
    numberofguests:Number,
    name:String,
    phone:String,
    price:Number
})


const Booking = mongoose.model('Booking',bookingSchema);

module.exports = Booking ; 