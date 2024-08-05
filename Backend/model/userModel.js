const mongoose = require('mongoose');

// Define the User schema
const userSchemas= new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


const User = mongoose.model("User", userSchemas)
module.exports = User;
