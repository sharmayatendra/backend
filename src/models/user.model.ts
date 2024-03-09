import mongoose, { Schema, Document, model, Model, ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface IUser extends Document {
  avatar: string;
  coverImage: string;
  email: string;
  fullName: string;
  password: string;
  refreshToken: string;
  userName: string;
  watchHistory: ObjectId[];
}

/**
 * Defining the user schema here
 */
const userSchema: Schema<IUser> = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // store the AWS/cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, // store the AWS/cloudinary URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Define the User model type
interface IUserModel extends Model<IUser> {}

// Create the User model
export const User: IUserModel = model<IUser, IUserModel>("User", userSchema);
