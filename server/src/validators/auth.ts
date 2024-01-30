import { FormValidationError, InternalServerError } from "../utils/apiError";
import * as yup from "yup";

const authValidator = {
  validateSignUp: async (body: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    repeatPassword: string;
  }) => {
    try {
      const schema = yup.object().shape({
        email: yup.string().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        password: yup
          .string()
          .required("Password is required")
          .matches(/[a-z]+/, "Password must have at least one lowercase letter")
          .matches(/[A-Z]+/, "Password must have at least one uppercase letter")
          .matches(/\d+/, "Password must have at least one numerical character")
          .matches(
            /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/,
            "Password must have at least one special character"
          )
          .matches(/.{8,}/, "Password must be at least 8 characters long"),
        repeatPassword: yup
          .string()
          .required("Repeat Password is required")
          .matches(/[a-z]+/, "Password must have at least one lowercase letter")
          .matches(/[A-Z]+/, "Password must have at least one uppercase letter")
          .matches(/\d+/, "Password must have at least one numerical character")
          .matches(
            /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/,
            "Password must have at least one special character"
          )
          .matches(/.{8,}/, "Password must be at least 8 characters long"),
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
  validateLogin: async (body: { email: string; password: string }) => {
    try {
      const schema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required(),
      });

      const validatedData = await schema.validate(body, {
        abortEarly: false,
      });

      return validatedData;
    } catch (e: unknown) {
      if (e instanceof yup.ValidationError) {
        throw new FormValidationError(e.message);
      }
      throw e;
    }
  },
};

export default authValidator;
