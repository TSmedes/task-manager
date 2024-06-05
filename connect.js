const mongoose = require('mongoose');

//MongoDB connection
const connectionString = 
"mongodb+srv://Team7:1234@cluster0.glhvt.mongodb.net/TM-T7?retryWrites=true&w=majority";

const connectDB = () => {
  return mongoose.connect(connectionString);
};

module.exports = connectDB;