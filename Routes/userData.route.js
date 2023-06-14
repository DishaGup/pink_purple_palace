const express = require("express");
const userDataRouter = express.Router();
const bcrypt = require("bcrypt");    //for hashing of password
const jwt = require("jsonwebtoken");   //for authorization the realtime user
const { UserDataModel } = require("../Model/userData.model");



//get the data of user   --- url/data/user

userDataRouter.get("/", async (req, res) => {
 let filter={userId:req.body.userId,userName:req.body.userName }
 
    try {
    const users = await UserDataModel.find(filter);
    res.status(200).json({users});
  } catch (error) {
    res.status(400).json({ error:error.messsage });
  }
});


userDataRouter.post("/add", async (req, res) => {
    
    
       try {
       const users = new UserDataModel(req.body);
       await users.save()
       res.status(200).json({users});
     } catch (error) {
       res.status(400).json({ error:error.messsage });
     }
   });
   

module.exports = { userDataRouter };