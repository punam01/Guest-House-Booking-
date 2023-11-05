const createError=require("../utils/error")
const jwt =require("jsonwebtoken");

const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authenticated"))
    }
    jwt.verify(token,"WeLComeToNiTkGuEsThOuSe",(err,user)=>{
        if(err) return next(createError(403,"Invalid Toke"));
        req.user=user;
        next();
    })
}

 const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if (req.user.id===req.params.id||req.user.isAdmin) {
            next()
        }
        else{
            return next(createError(403,"You are not authenticated"))
        } 
    })
}

const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if (req.user.isAdmin) {
            next()
        }
        else{
            return next(createError(403,"You are not authenticated"))
        } 
    })
}
module.exports={verifyToken,verifyUser,verifyAdmin};