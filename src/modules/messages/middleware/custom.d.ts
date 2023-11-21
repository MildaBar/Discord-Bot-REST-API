import { Request } from "express";

/**
 * Extends the Request object in Express by adding an optional 'messagesTarget' property.
 * This enhancement enables the attachment of a custom string property to the Request object.
 * It provides a way to store and access additional information during the processing
 * of HTTP requests within an Express application.
 */
declare global {
  // within the Express namespace, extend the Request interface
  namespace Express {
    // add a new optional property 'messagesTarget' to the Request interface
    interface Request {
      messagesTarget?: string;
    }
  }
}
