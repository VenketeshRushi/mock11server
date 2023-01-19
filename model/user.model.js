const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: String,
  password: String,
});
const UserModel = model("UserSchema1", UserSchema);

module.exports = UserModel;
