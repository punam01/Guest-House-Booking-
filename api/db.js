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

module.exports = connectToMongo;
