const GH = require("../models/GuestHouse");
const Room = require("../models/Room");

const createGH = async (req, res, next) => {
  const newGH = new GH(req.body);
  try {
    const savedGH = await newGH.save();
    res.status(200).json(savedGH);
  } catch (err) {
    next(err);
  }
};

const updateGH = async (req, res, next) => {
  try {
    const updatedGH = await GH.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedGH);
  } catch (err) {
    next(err);
  }
};
const getGHNames=async (req, res, next) => {
  try {
    const guesthouses = await GH.find({}, 'name'); 
    res.status(200).json(guesthouses);
  } catch (err) {
    next(err);
  }
};
const deleteGH = async (req, res, next) => {
  try {
    await GH.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

const getGH = async (req, res, next) => {
  try {
    const guesthouse = await GH.findById(req.params.id);
    res.status(200).json(guesthouse);
  } catch (err) {
    next(err);
  }
};

const getAllGH = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const guesthouses = await GH.find({
      ...others,
      cheapestPrice: { $gt: min || 0, $lt: max || 999 }
    }).limit(req.query.limit);
    res.status(200).json(guesthouses);
  } catch (err) {
    next(err);
  }
};
const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return GH.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
const getGHByAminity = async (req, res, next) => {
  const aminity = req.query.aminity;

  try {
    const guesthouses = await GH.find({ aminities: { $regex: aminity, $options: "i" } });
    res.status(200).json(guesthouses);
  } catch (err) {
    next(err);
  }
};

const countByType = async (req, res, next) => {
  try {
    const generalCount = await GH.countDocuments({ type: "general" });
    const vipCount = await GH.countDocuments({ type: "vip" });
    res.status(200).json([
      { type: "general", count: generalCount },
      { type: "vip", count: vipCount },
    ]);
  } catch (err) {
    next(err);
  }
};

const getGHRooms=async(req,res,next)=>{
  try{
    const guesthouse=await GH.findById(req.params.id);
    const list=await Promise.all(guesthouse.rooms.map(room=>{
      return Room.findById(room);
    }))
    res.status(200).json(list);
  }
  catch(err){
    next(err);
  }
}
module.exports = {
  createGH,
  updateGH,
  deleteGH,
  getGH,
  getAllGH,
  countByCity,
  countByType,
  getGHRooms,
  getGHByAminity,
  getGHNames
};
