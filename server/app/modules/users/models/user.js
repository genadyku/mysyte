import mongoose, { Schema } from "mongoose";
import uuid from "uuid/v4";
import bcryptjs from "bcryptjs";
// import beautifyUnique from 'mongoose-beautiful-unique-validation';

// import {hashPassword } from '../../users/helpers/helper';

// mongoose.plugin(beautifyUnique);

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: "UserName  \"{VALUE}\" already exist",
      required: "UserName is required",
    },
    email: {
      type: String,
      unique: "User with email \"{VALUE}\" already exist",
      lowercase: true,
      required: "Email is required",
      trim: true,
    },

    hash: {
      type: String,
      unique: "Hash mast be unique",
    },
    password: {
      type: String,
      required: "Password is required",
      trim: true,
    },
    admin: {
      type: String,

    },
    isConfirm: {
      type: Boolean,
    },
    refreshToken: {
      type: String,
    },
    confirmAccountTokenExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.createFields = ["email", "password", "isConfirm"];

UserSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    const salt = bcryptjs.genSaltSync(10);

    this.password = bcryptjs.hashSync(this.password, salt);
  }

  if (!this.hash) {
    this.hash = uuid();
  }

  next();
});
UserSchema.methods.comparePasswords = function(password) {
  return bcryptjs.compareSync(password, this.password);
};

export default mongoose.model("user", UserSchema);
