import { Express } from "express";

import authRoutes from "./auth";
import resumeRoutes from "./resumes";
import { verifyToken } from "../middleware";

export default function (app: Express) {
  app.use("/auth", authRoutes);
  app.use("/resumes", verifyToken(), resumeRoutes);
}
