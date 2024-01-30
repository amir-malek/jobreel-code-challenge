// ApiError.ts

interface IApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  isApiError: boolean;
  fields?: Record<string, any>;
  code: number;
  type: string;
}

const DEFAULT_ERRORS: Record<string, { code: string; message: string }> = {
  BAD_TOKEN: {
    code: "BAD_TOKEN",
    message: "Token is not valid",
  },
  TOKEN_EXPIRED: {
    code: "TOKEN_EXPIRED",
    message: "Token expired",
  },
  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    message: "Invalid credentials",
  },
  SERVER_ERROR: {
    code: "SERVER_ERROR",
    message: "Internal server error",
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    message: "Not found",
  },
  BAD_REQUEST: {
    code: "BAD_REQUEST",
    message: "Bad request",
  },
  FORBIDDEN: {
    code: "FORBIDDEN",
    message: "Permission denied",
  },
  VALIDATION: {
    code: "VALIDATION",
    message: "Validation error",
  },
};

class ApiError extends Error implements IApiError {
  public statusCode: number;
  public isOperational: boolean;
  public isApiError: boolean;
  public fields?: Record<string, any>;
  public code: number;
  public type: string;

  constructor(
    message: string,
    statusCode: number,
    type: string,
    isOperational: boolean,
    fields: Record<string, any> | undefined = undefined
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.statusCode = statusCode;
    this.type = type;
    this.isOperational = isOperational;
    this.isApiError = true;
    this.fields = fields;
    this.code = 0;
  }
}

class NotFoundError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.NOT_FOUND.message,
    type = DEFAULT_ERRORS.NOT_FOUND.code
  ) {
    super(message, 404, type, true);
  }
}

class BadRequestError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.BAD_REQUEST.message,
    type = DEFAULT_ERRORS.BAD_REQUEST.code
  ) {
    super(message, 400, type, true);
  }
}

class ValidationError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.VALIDATION.message,
    type = DEFAULT_ERRORS.VALIDATION.code
  ) {
    super(message, 400, type, true);
  }
}

class UnauthorizedError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.UNAUTHORIZED.message,
    type = DEFAULT_ERRORS.UNAUTHORIZED.code
  ) {
    super(message, 401, type, true);
  }
}

class ForbiddenError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.FORBIDDEN.message,
    type = DEFAULT_ERRORS.FORBIDDEN.code
  ) {
    super(message, 403, type, true);
  }
}

class FormValidationError extends ApiError {
  constructor(
    e: any,
    message: string = DEFAULT_ERRORS.VALIDATION.message,
    type: string = DEFAULT_ERRORS.VALIDATION.code
  ) {
    const errors = e.inner;
    const fieldErrors: Record<string, any> = {};

    for (let i = 0; i < errors.length; i++) {
      fieldErrors[errors[i].path] = errors[i].message;
    }

    super(message, 400, type, true, fieldErrors);
  }
}

class InternalServerError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.SERVER_ERROR.message,
    type = DEFAULT_ERRORS.SERVER_ERROR.code
  ) {
    super(message, 500, type, true);
  }
}

class BadTokenError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.BAD_TOKEN.message,
    type = DEFAULT_ERRORS.BAD_TOKEN.code
  ) {
    super(message, 401, type, true);
  }
}

class TokenExpiredError extends ApiError {
  constructor(
    message = DEFAULT_ERRORS.TOKEN_EXPIRED.message,
    type = DEFAULT_ERRORS.TOKEN_EXPIRED.code
  ) {
    super(message, 401, type, true);
  }
}

function IsApiError(err: any): err is ApiError {
  return err instanceof ApiError;
}

export {
  ApiError,
  IsApiError,
  NotFoundError,
  BadRequestError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  BadTokenError,
  TokenExpiredError,
  FormValidationError
};
