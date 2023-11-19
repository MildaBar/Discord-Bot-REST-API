import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err.name === "NotFoundError") {
    res.status(StatusCodes.NOT_FOUND).json({
      error: {
        message: err.message || "Not Found error",
        status: StatusCodes.NOT_FOUND,
      },
    });
  } else if (err.name === "ValidationError") {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: {
        message: err.message || "Validation error",
        status: StatusCodes.BAD_REQUEST,
      },
    });
  } else {
    const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode);

    res.json({
      error: {
        message: err.message || "Internal Server Error",
        status: statusCode,
      },
    });
  }
};

export const handleErrors: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error in sending message to Discord:", err);

  if (err.discordError) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: "Failed to post message to Discord",
        details: err.message,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    });
  } else {
    next(err);
  }
};
