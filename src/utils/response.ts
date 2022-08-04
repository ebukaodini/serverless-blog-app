import { Request, Response, NextFunction } from 'express';

/**
 * Use the custom response middleware to extend express response object.
 */
export const response = (req: Request, res: Response, next: NextFunction) => {

  /**
   * Returns a success response
   * @param message response message
   * @param data response data
   * @param statusCode response status code. Defaults to 200
   * @returns Response
   */
  res.success = function (message: string, data: any, statusCode: number = 200) {
    return this.status(statusCode).json({
      status: true,
      message: message,
      ...(data !== undefined) && { data: data }
    })
  }

  /**
   * Returns a error response
   * @param message response message
   * @param error response error data
   * @param statusCode response status code. Defaults to 400
   * @returns Response
   */
  res.error = function (message: string, error: any, statusCode: number = 400) {
    return this.status(statusCode).json({
      status: false,
      message: message,
      ...(error !== undefined) && { errors: error }
    })
  }

  next()
}