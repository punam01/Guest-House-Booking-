const express = require("express");
const { createGH,updateGH,deleteGH,getAllGH,getGH} = require("../controllers/guesthouses");
const { verifyAdmin } = require("../utils/verifyToken");

const router=express.Router();

//CREATE
router.post("/",verifyAdmin ,createGH);

//UPDATE
router.put("/:id",verifyAdmin,updateGH);

//DELETE
router.delete("/:id",verifyAdmin,deleteGH);

//GET
router.get("/:id",getGH);

//GET ALL
router.get("/",getAllGH);

module.exports = router; 