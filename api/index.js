const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const authRoute =require("./routes/auth.js");
const usersRoute =require("./routes/users.js");
const guesthousesRoute =require("./routes/guesthouses.js");
const roomsRoute =require("./routes/rooms.js");
connectToMongo();
const app = express();
const port = 5000;



app.use(cors());

app.use(express.json());

//middlewares
app.use("/auth",authRoute);
app.use("/guesthouses",guesthousesRoute);
app.use("/rooms",roomsRoute);
app.use("/users",usersRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
