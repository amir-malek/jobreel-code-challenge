import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

export default function verifyToken() {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        return res.status(403).send({
          message: "No token provided",
        });
      }

      let decoded: JwtPayload = {
        id: "",
      };
      let error: any;

      jwt.verify(token, process.env.JWT_SECRET ?? "", (err, dec) => {
        if (err) {
          error = err;
        }
        if (dec) {
          decoded = dec as JwtPayload;
        }
      });

      if (error) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      req.user = user;
      next();
    } catch (e) {
      res.status(401).send({ message: "Unauthorized" });
    }
  };
}

module.exports = verifyToken;
