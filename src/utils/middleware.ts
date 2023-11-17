import {
  type Response,
  type Request,
  type NextFunction,
  type RequestHandler,
} from "express";
import { StatusCodes } from "http-status-codes";

type JsonHandler<T extends object> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;

/**
 * Custom stringify function to handle circular references during JSON serialization.
 *
 * Circular references can occur when an object refers to itself, either directly
 * or indirectly through a chain of references. This stringify function uses a cache
 * array to keep track of objects encountered during serialization. If a circular
 * reference is detected, the corresponding key is discarded to avoid issues with
 * JSON.stringify. The cache is reset after the serialization process.
 *
 * note: I got the help from here: https://codedamn.com/news/javascript/how-to-fix-typeerror-converting-circular-structure-to-json-in-js
 *
 * @param {object} obj - The object to be serialized to JSON.
 * @returns {string} - The stringified JSON representation of the object.
 */
function stringify(obj: object): string {
  let cache: any[] | null = [];
  let str = JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache!.indexOf(value) !== -1) {
        return;
      }
      // store value
      cache!.push(value);
    }
    return value;
  });
  // reset cache
  cache = null;
  return str;
}

/**
 * Wraps a request handler that returns an object and
 * sends it as JSON. Handles async errors.
 * @param handler Request handler that returns a serializable object.
 * @returns Request handler that sends the result as JSON.
 */
export function jsonRoute<T extends object>(
  handler: JsonHandler<T>,
  statusCode = StatusCodes.OK
): RequestHandler {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);

      // check if headers have been sent, if yes, skip sending the response
      if (res.headersSent) {
        return next();
      }

      res.status(statusCode);
      res.send(stringify(result as T));
    } catch (error) {
      next(error);
    }
  };
}
