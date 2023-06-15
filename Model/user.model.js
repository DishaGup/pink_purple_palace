const { Schema, model } = require("mongoose");

// Define the user schema
const userSchema = Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);


// Create the User model using the user schema
const UserModel = model("users_data", userSchema);

module.exports = { UserModel };
