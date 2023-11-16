const express = require("express");
const {updateUser,deleteUser,getAllUser,getUser, makeAdmin, removeAdmin} = require("../controllers/users");
const {verifyToken,verifyUser,verifyAdmin } = require("../utils/verifyToken");

const router=express.Router();

/*router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("hello user u r logged in ");
} )

router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("loggedin and can delete ");
} )

router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("u r admin loggedin and can delete ");
} )
*/

//UPDATE
router.put("/:id",verifyUser, updateUser);

//DELETE
router.delete("/:id",verifyUser,deleteUser);

//GET
router.get("/:id",verifyUser,getUser);

//GET ALL
router.get("/",verifyAdmin,getAllUser);


router.put('/:userId/make-admin', makeAdmin );
router.put('/:userId/remove-admin', removeAdmin );
module.exports = router; 