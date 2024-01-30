import { FormValidationError } from "../utils/apiError";
import * as yup from "yup";
import { IResume } from "../models/Resume";

const resumesValidator = {
  validateCreateResume: async (body: IResume) => {
    try {
      const workExperienceSchema = yup.object().shape({
        title: yup.string().required(),
        company: yup.string().required(),
        description: yup.string().required(),
        startDate: yup.date().required(),
        endDate: yup.string().nullable(),
        currentlyWorking: yup.boolean().required(),
      });

      const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        summary: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().required(),
        workExperience: yup
          .array()
          .of(workExperienceSchema)
          .min(1, "at least one record is required")
          .required(),
      });

      const validatedData = await schema.validate(body, {
        abortEarly: false,
      });

      return validatedData;
    } catch (e: unknown) {
      if (e instanceof yup.ValidationError) {
        throw new FormValidationError(e, e.message);
      }
      throw e;
    }
  },
};

export default resumesValidator;
