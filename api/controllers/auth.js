const User = require("../models/User");
const bcrypt = require('bcryptjs');
const createError=require("../utils/error")
const jwt =require("jsonwebtoken");

const register=async(req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser=new User({
        ...req.body,
        password:hash
    })
    await newUser.save();
    res.status(201).json("User created");
    }
    catch(err){
        next(err);
    }
}
const login=async(req,res,next)=>{
    try{
        const user=await User.findOne({username:req.body.username});
        if(!user) return next(createError(404,"User not found"));

        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect) return next(createError(400,"Invalid creds"));

        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},"WeLComeToNiTkGuEsThOuSe");
        const {password,isAdmin,...otherDetails}=user._doc;
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json({details:{...otherDetails},isAdmin});
    }
    catch(err){
        next(err);
    }
}

const logout = async (req, res) => {
  try {
    await res.clearCookie("access_token", { httpOnly: true });
    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports={register,login,logout}
