const express = require("express");
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRoom, updateRoomAvailability } = require("../controllers/rooms");
const {verifyAdmin}=require("../utils/verifyToken")
const router=express.Router();

//CREATE
router.post("/:hotelId",verifyAdmin ,createRoom);

//UPDATE
router.put("/:id",verifyAdmin,updateRoom);
router.put("/availability/:id",updateRoomAvailability );
//DELETE
router.delete("/:id/:hotelId",verifyAdmin,deleteRoom);

//GET
router.get("/:id",getRoom);

//GET ALL
router.get("/",getAllRoom);

module.exports = router; 