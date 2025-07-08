import type { Request, Response, NextFunction } from "express";
import type ApiError from "../errors/api-error";
const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ error: "Request body must be a valid JSON." });
    return;
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export default errorHandler;
