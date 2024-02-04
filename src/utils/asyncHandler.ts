import { Request, Response, NextFunction } from "express";

/**
 * This function is wrapper around the default request
 */
export const asyncHandler =
  (
    requestHandler: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<any>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      res.status(error.code || 500).json({
        success: false,
        message: error.message,
      });
    }
  };
