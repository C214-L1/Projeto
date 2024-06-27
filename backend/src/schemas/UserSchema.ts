import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  createdAd: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    unique: true,
    require: false,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    first: {
      type: String,
      require: true,
    },
    last: {
      type: String,
      require: true,
    },
  },
});
