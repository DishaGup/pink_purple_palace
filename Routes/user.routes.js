const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt"); //for hashing of password
const jwt = require("jsonwebtoken"); //for authorization the realtime user
const { UserModel } = require("../Model/user.model"); //model of userData

//Route for creating the account  ---   url/users/register

userRouter.post("/register", async (req, res) => {
  try {
    const { email, password, name, username } = req.body;

    // checking if user with this email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "Email already exists, Please Login" });
    }

    bcrypt.hash(password, 3, async (err, hash) => {
      // create a new user
      const user = new UserModel({
        email,
        password: hash, //giving hash value to a password
        name,
        username,
      });
      await user.save();

      // return success message
      res.status(201).json({ message: "Account created successfully" });
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

//Route for login into account  ---   url/users/login

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, name: user.name }, // passing userId and userName using jwt
            "broker"
          );

          res.status(200).json({
            message: "Login Sucessful",
            token,
            userD:[user]
          });
        } else {
          res
            .status(401)
            .send({ message: "Authorization revoked, Wrong Credentials" });
        }
      });
    } else {
      res
        .status(401)
        .send({ message: "Authorization revoked, Wrong Credentials" });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

//get the list of all users   --- url/users

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.messsage });
  }
});

module.exports = { userRouter };
