import mongoose from "mongoose";
import { IResume } from "./Resume";

export interface IWorkExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  resume: IResume;
}

const workExperienceSchema = new mongoose.Schema<IWorkExperience>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  description: { type: String },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
});

const WorkExperience = mongoose.model<IWorkExperience>(
  "WorkExperience",
  workExperienceSchema
);

export default WorkExperience;
