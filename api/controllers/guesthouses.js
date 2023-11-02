const GH=require("../models/GuestHouse");

const createGH=async(req,res,next)=>{
    const newGH=new GH(req.body);
    try{
        const savedGH=await newGH.save();
        res.status(200).json(savedGH);
    }
    catch(err){
        next(err);
    }
}

const updateGH=async(req,res,next)=>{
    try{
        const updatedGH=await GH.findByIdAndUpdate(req.params.id,{ $set: req.body},{new:true});
        res.status(200).json(updatedGH);
    }
    catch(err){
        next(err);
    }
}

const deleteGH=async(req,res,next)=>{
    try{
        await GH.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    }
    catch(err){
        next(err);
    }
}

const getGH=async(req,res,next)=>{
    try{
        const guesthouse = await GH.findById(req.params.id);
        res.status(200).json(guesthouse);
    }
    catch(err){
        next(err);
    }
}

const getAllGH=async(req,res,next)=>{
    try{
        const guesthouses = await GH.find();
        res.status(200).json(guesthouses);
    }
    catch(err){
        next(err);
    }
}
module.exports={createGH,updateGH,deleteGH,getGH,getAllGH};