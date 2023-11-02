const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const authRoute =require("./routes/auth");
const usersRoute =require("./routes/users");
const guesthousesRoute =require("./routes/guesthouses");
const roomsRoute =require("./routes/rooms");
const cookieParser = require("cookie-parser");

connectToMongo();
const app = express();
const port = 5000;



app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth",authRoute);
app.use("/guesthouses",guesthousesRoute);
app.use("/rooms",roomsRoute);
app.use("/users",usersRoute);

//error handling middleware
//middlewares
app.use((err,req,res,next)=>{
  const errorStatus=err.status || 500;
  const errorMessage=err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
