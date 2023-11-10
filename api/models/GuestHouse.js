const mongoose=require("mongoose");

const GuestHouseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    distance:{
        type:Number,
        required:true
    },
    photo:{
        type:[String],
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    rooms:{
        type:[],
    },
    cheapestPrice:{
        type:Number,
    },
    featured:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model("GuestHouse",GuestHouseSchema); 