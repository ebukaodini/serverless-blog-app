declare namespace Express {
  interface Request {
    user: any,
    role: any
  }
  interface Response {
    success: (
      message: string,
      data?: any,
      statusCode?: number
    ) => Response<any, Record<string, any>>,
    error: (
      message: string,
      error?: any,
      statusCode?: number
    ) => Response<any, Record<string, any>>
  }
}