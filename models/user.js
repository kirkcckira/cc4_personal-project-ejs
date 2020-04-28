const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, require: true },
  username: { type: String, require: true },
  password: { type: String, require: true },
  name: { type: String, require: true },
  description: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
