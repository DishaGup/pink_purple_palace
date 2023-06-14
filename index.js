const express=require("express");
const { connection } = require("./Server/connection");
const { userRouter } = require("./Routes/user.routes");
const app=express()
require("dotenv").config()

//Route for users
app.use("/users",userRouter)


app.listen(process.env.port, async () => {
    try {
      await connection
      console.log("backend connected to MongoDB");
    } catch (err) {
      console.log("Not connected to MongoDB");
    }
    console.log(`Server running at port ${process.env.PORT} `);
  });