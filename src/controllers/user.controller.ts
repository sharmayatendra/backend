import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { IUser } from "../models";

const registerUser = asyncHandler(
  async (req: Request<{}, {}, IUser>, res: Response) => {
    const { fullName, userName, email, password } = req.body;

    console.log("email:::", email);
  }
);

export { registerUser };
