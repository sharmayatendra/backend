import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { IUser } from "../models";
import { User } from "../models/user.model";
import { uploadFileOnCloudinary } from "../utils/cloudinary";
import { ApiResponse } from "../utils/ApiResponse";

const registerUser = asyncHandler(
  async (req: Request<{}, {}, IUser>, res: Response) => {
    const { fullName, userName, email, password } = req.body;
    const fieldList = [fullName, userName, email, password];

    // check if any of the field is empty
    const isEmptyField = fieldList.some((field) => field?.trim() === "");

    if (isEmptyField) {
      throw new ApiError(400, "All fields are required");
    }

    // checks if user is already registered
    const existedUser = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (existedUser) {
      throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath = (req.files as any)?.avatar[0]?.path;
    // const coverImageLocalPath = (req.files as any)?.coverImage[0]?.path;
    let coverImageLocalPath;
    // TODO: Make it type safe
    if (
      req.files &&
      Array.isArray((req.files as any).coverImage) &&
      (req.files as any).coverImage.length > 0
    ) {
      coverImageLocalPath = (req.files as any).coverImage[0].path;
    }

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadFileOnCloudinary(avatarLocalPath);
    const coverImage = await uploadFileOnCloudinary(coverImageLocalPath);

    if (!avatar) {
      throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
      fullName,
      avatar: avatar.url,
      userName: userName.toLowerCase(),
      coverImage: coverImage?.url || "",
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while creating a new user");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User created successfully"));
  }
);

export { registerUser };
