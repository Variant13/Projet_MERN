const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
    
  pseudo: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    validator: [isEmail],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    minlength: 6
  },
  bio : {
    type: String,
    max: 1024
  },
  followers: {
    type: [String]
  },
  following: {
    type: [String]
  },
  likes: {
    type: [String]
  },
 },
  {
    timestamps: true,
      
  }
)

const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;