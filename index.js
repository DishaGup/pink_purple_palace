const express=require("express");
const { connection } = require("./Server/connection");
const { userRouter } = require("./Routes/user.routes");
const { userDataRouter } = require("./Routes/userData.route");
const { auth } = require("./Controllers/auth..middleware");
const cors =require("cors")
const app=express()
require("dotenv").config()

//Route for users
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/data/user",auth,userDataRouter)


app.listen(process.env.port, async () => {
    try {
      await connection
      console.log("backend connected to MongoDB");
    } catch (err) {
      console.log("Not connected to MongoDB");
    }
    console.log(`Server running at port ${process.env.PORT} `);
  });