const mongoose = require('mongoose');
const { userSchema: zodUserSchema, userSchemaes } = require('../validation/validation');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED, sendSuccess, sendError } = require('../utils/statusCode');
const User = require('../model/userModel');


const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  const validation = zodUserSchema.safeParse({ username, email, password });
  if (!validation.success) {
    return sendError(res, validation.error.issues, BAD_REQUEST);
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, "Email is already registered", BAD_REQUEST);
    }

    const newUser = await User.create({
          email,
          password,
          username
    })
    await newUser.save();
    sendSuccess(res, "Registered Successfully", {newUser});
  } catch (error) {
    console.error('Error registering user:', error);
    sendError(res, "Error registering user", INTERNAL_SERVER_ERROR);
  }
};

const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  const validation = userSchemaes.safeParse({ email, password });
  if (!validation.success) {
    return sendError(res, validation.error.issues, BAD_REQUEST);
  }

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
      const decoded = jwt.verify(token, secretKey);
      const id = decoded.id;
      console.log(id);
      sendSuccess(res, "Authenticated Successfully", { token, id });
    } else {
      sendError(res, "Invalid User", UNAUTHORIZED);
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    sendError(res, "Error authenticating user", INTERNAL_SERVER_ERROR);
  }
};

module.exports = { registerUser, authenticateUser };
