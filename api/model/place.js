const mongoose = require("mongoose");
require("../db/connect");

const placeSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title:String,
    address:String,
    photos:[String],
    description:String,
    features:[String],
    extrainfo:String,
    checkin:String,
    checkout:String,
    maxguest:Number,
    price:Number
});

const Place = mongoose.model('Place',placeSchema);

module.exports = Place;