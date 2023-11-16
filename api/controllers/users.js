const User=require("../models/User");

const updateUser=async(req,res,next)=>{
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{ $set: req.body},{new:true});
        res.status(200).json(updatedUser);
    }
    catch(err){
        next(err);
    }
}

const deleteUser=async(req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    }
    catch(err){
        next(err);
    }
}

const getUser=async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        next(err);
    }
}

const getAllUser=async(req,res,next)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(err){
        next(err);
    }
}
const makeAdmin=async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAdmin: true },
      { new: true }
    );
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
const removeAdmin=async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAdmin: false },
      { new: true }
    );
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
module.exports={updateUser,deleteUser,getUser,getAllUser,makeAdmin,removeAdmin};