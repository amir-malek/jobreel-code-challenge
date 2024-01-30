import express from "express";
import { resumeController } from "../controllers";

const router = express.Router();

router.get("/", resumeController.list);
router.post("/", resumeController.create);
router.get("/:resumeId", resumeController.show);
router.delete("/:resumeId", resumeController.delete);
router.patch("/:resumeId", resumeController.update);

export default router;
