const express = require("express");
const userDataRouter = express.Router();
const bcrypt = require("bcrypt"); //for hashing of password
const jwt = require("jsonwebtoken"); //for authorization the realtime user
const { UserDataModel } = require("../Model/userData.model");

//get the data of user   --- url/data/user

userDataRouter.get("/", async (req, res) => {
  let filter = { userId: req.body.userId, userName: req.body.userName };

  try {
    const users = await UserDataModel.find(filter);
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
});

userDataRouter.post("/add", async (req, res) => {
  try {
    const users = new UserDataModel(req.body);
    await users.save();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
});

userDataRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await UserDataModel.findByIdAndDelete({ _id: id });
    res.status(201).send({ message: "deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
});


userDataRouter.get("/single/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const searchList = UserDataModel.findById({ _id: id });
    res.status(201).send({ searchList });
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
});



userDataRouter.get("/search", async (req, res) => {
  let filters={}
    if(req.query.name){
        filters.name={$regex:req.query.name, $options:"i"}
    }
    try {
     const searchList=await UserDataModel.find(filters).skip(0)
     res.status(200).send({searchList})   
    } catch (error) {
        res.status(400).send({error})
    }
    
});

module.exports = { userDataRouter };
