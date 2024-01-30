import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { authValidator } from "../validators";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/apiError";

const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await authValidator.validateLogin(req.body);

      const user = await User.findOne({ email: validatedData?.email });

      if (!user || !(await user.comparePassword(validatedData?.password))) {
        throw new UnauthorizedError(
          "Login failed! Check authentication credentials"
        );
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        // @ts-ignore
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.send({
        message: "Data submitted successfully",
        data: {
          token,
        },
      });
    } catch (e) {
      next(e);
    }
  },
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await authValidator.validateSignUp(req.body);

      const user = new User(validatedData);
      const dbUser = await user.save();   

      const token = jwt.sign(
        {
          id: dbUser._id,
        },
        // @ts-ignore
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.send({
        message: "Data submitted successfully",
        data: {
          token,
        },
      });
    } catch (e) {
      next(e);
    }
  },
};

export default authController;
