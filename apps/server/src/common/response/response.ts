import { Response } from "express";

/**
 * Sends a standardized success response to the client.
 * 
 * This helper ensures all successful API responses follow the same structure,
 * making it easier for frontend developers to handle responses consistently.
 * 
 * @template T - The type of data being sent in the response
 * @param {Response} res - Express response object used to send the HTTP response
 * @param {T} data - The actual payload/data to be sent to the client
 * @param {string} [message="Request successful"] - A human-readable success message
 * @param {number} [statusCode=200] - HTTP status code (default: 200 OK)
 * @returns {Response} The Express response with status code and JSON body
 * 
 * @example
 * // Sending a user object
 * sendSuccess(res, { id: 1, name: "John" }, "User retrieved successfully");
 * 
 * @example
 * // Sending a list with default message
 * sendSuccess(res, ["apple", "banana"], "Products fetched", 200);
 * 
 * @example
 * // Sending null data with custom status
 * sendSuccess(res, null, "User deleted", 204);
 */

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = "Request successful",
  statusCode: number = 200,
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
