import mongoose from "mongoose";
import { IUser } from "./User";
import { IWorkExperience } from "./WorkExperience";
import { ObjectId } from "mongodb";

export interface IResume {
  firstName: string;
  lastName: string;
  summary: string;
  email: string;
  phone: string;
  user: IUser;
  workExperience: IWorkExperience[] | ObjectId[]
}

const resumeSchema = new mongoose.Schema<IResume>({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  summary: { type: String, required: true },
  email: {type: String, required: true},
  phone: {type: String, required: true},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workExperience: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkExperience'
  }]
});

const Resume = mongoose.model<IResume>("Resume", resumeSchema);
export default Resume;
