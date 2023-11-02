const express = require("express");
const GH=require("../models/GuestHouse");
const router=express.Router();

//CREATE
router.post("/",async (req,res)=>{
    const newGH=new GH(req.body);
    try{
        const savedGH=await newGH.save();
        res.status(200).json(savedGH);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id",async (req,res)=>{
    try{
        const updatedGH=await GH.findByIdAndUpdate(req.params.id,{ $set: req.body},{new:true});
        res.status(200).json(updatedGH);
    }
    catch(err){
        res.status(500).json(err);
    }
});


//DELETE
router.delete("/:id",async (req,res)=>{
    try{
        await GH.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET
router.get("/:id",async (req,res)=>{
    try{
        const guesthouse = await GH.findById(req.params.id);
        res.status(200).json(guesthouse);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET ALL
//GET
router.get("/",async (req,res)=>{
    try{
        const guesthouses = await GH.find();
        res.status(200).json(guesthouses);
    }
    catch(err){
        res.status(500).json(err);
    }
});
module.exports = router; 