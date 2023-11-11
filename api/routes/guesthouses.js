const express = require("express");
const { createGH,updateGH,deleteGH,getAllGH,getGH,countByCity,countByType, getGHRooms, countByAminities, getGHByAminity} = require("../controllers/guesthouses");
const { verifyAdmin } = require("../utils/verifyToken");

const router=express.Router();

//CREATE
router.post("/",verifyAdmin ,createGH);

//UPDATE
router.put("/:id",verifyAdmin,updateGH);

//DELETE
router.delete("/:id",verifyAdmin,deleteGH);

//GET
router.get("/find/:id",getGH);

//GET ALL
router.get("/",getAllGH);

//GET ALL
router.get("/countByCity",countByCity);
router.get("/byAminity", getGHByAminity);
//GET ALL
router.get("/countByType",countByType);

//GET ROOMS /room/hotelid
router.get("/room/:id",getGHRooms);

module.exports = router; 