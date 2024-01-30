import mongoose from "mongoose";
import { IResume } from "./Resume";

interface IWorkExperience {
  title: string;
  companyName: string;
  startDate: string;
  endDate: string;
  description: string;
  resume: IResume;
}

const workExperienceSchema = new mongoose.Schema<IWorkExperience>({
  title: { type: String, required: true },
  companyName: { type: String, required: true },
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
