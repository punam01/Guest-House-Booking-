const express = require("express");
const { createGH,updateGH,deleteGH,getAllGH,getGH} = require("../controllers/guesthouses");

const router=express.Router();

//CREATE
router.post("/",createGH);

//UPDATE
router.put("/:id",updateGH);

//DELETE
router.delete("/:id",deleteGH);

//GET
router.get("/:id",getGH);

//GET ALL
router.get("/",getAllGH);

module.exports = router; 