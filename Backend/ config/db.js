const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!url) {
      throw new Error('MONGODB_URI is not defined');
    }
    await mongoose.connect(url);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting:', error);
    process.exit(1);
  }
};

module.exports = connectDB;