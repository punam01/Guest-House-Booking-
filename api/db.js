const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/Booking";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("Connection success");
    })
    .catch((error) => {
      console.log(" Error " + error);
    });
};

mongoose.connection.on("disconnected",()=>{
  console.log("MongoDb disconnected");
})
mongoose.connection.on("connected",()=>{
  console.log("MongoDb connected");
})
module.exports = connectToMongo;
