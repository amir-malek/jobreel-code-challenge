import { Request, Response, NextFunction } from "express";
import Resume from "../models/Resume";
import WorkExperience from "../models/WorkExperience";
import { resumesValidator } from "../validators";
import { NotFoundError } from "../utils/apiError";
import mongoose from "mongoose";

const resumeController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const resumes = await Resume.find({ user: userId });

      res.send({
        message: "Data retrieved successfully",
        data: {
          resumes,
        },
      });
    } catch (e) {
      next(e);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await resumesValidator.validateCreateResume(
        req.body
      );

      const resume = new Resume({
        firstName: validatedData?.firstName,
        lastName: validatedData?.lastName,
        email: validatedData?.email,
        phone: validatedData?.phone,
        summary: validatedData?.summary,
        user: req.user?._id,
      });
      await resume.save();

      const workExperienceIds = [];
      for (let i = 0; i < validatedData?.workExperience.length; i++) {
        const we = validatedData?.workExperience[i];

        const workExperience = new WorkExperience({
          title: we.title,
          company: we.company,
          description: we.description,
          startDate: we.startDate,
          endDate: Boolean(we.currentlyWorking) ? null : we.endDate,
          resume: resume._id,
        });
        await workExperience.save();
        workExperienceIds.push(workExperience._id);
      }

      resume.workExperience = workExperienceIds;
      await resume.save();

      res.send({
        message: "Data submitted successfully",
      });
    } catch (e) {
      next(e);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resume = await Resume.findById(req.params.resumeId).populate(
        "workExperience"
      );

      if (!resume) {
        throw new NotFoundError("Resume not found");
      }

      res.send({
        message: "Data retrieved successfully",
        data: {
          resume,
        },
      });
    } catch (e) {
      next(e);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resumeId = req.params.resumeId;
      const validatedData = await resumesValidator.validateCreateResume(
        req.body
      );

      const resume = await Resume.findByIdAndUpdate(
        resumeId,
        {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          summary: validatedData.summary,
        },
        { new: true }
      );

      if (!resume) {
        throw new NotFoundError("Resume not found");
      }

      await WorkExperience.deleteMany({ resume: resume._id });

      const workExperienceIds = [];
      for (const we of validatedData.workExperience) {
        const workExperience = new WorkExperience({
          title: we.title,
          company: we.company,
          description: we.description,
          startDate: we.startDate,
          endDate: Boolean(we.currentlyWorking) ? null : we.endDate,
          resume: resume._id,
        });
        await workExperience.save();
        workExperienceIds.push(workExperience._id);
      }

      resume.workExperience = workExperienceIds;
      await resume.save();

      res.send({ message: "Resume updated successfully" });
    } catch (e) {
      next(e);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { resumeId } = req.params;

      const resume = await Resume.findByIdAndDelete(resumeId);
      if (!resume) {
        throw new NotFoundError("Resume not found!");
      }

      await WorkExperience.deleteMany({ resume: resumeId });

      res.send({
        message: "resume deleted successfully",
      });
    } catch (e) {
      next(e);
    }
  },
};

export default resumeController;
