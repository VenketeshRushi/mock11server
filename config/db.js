const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()
const connect = () => {
  mongoose.set('strictQuery', false);
  return mongoose.connect("mongodb+srv://raman:raman@cluster0.fm7rpoi.mongodb.net/ecom",{ useNewUrlParser: true });
};
module.exports = connect;
