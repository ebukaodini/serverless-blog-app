// import moduleAlias from 'module-alias'
import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import ServerlessHttp from 'serverless-http'
import createError from 'http-errors'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { response } from './utils/response'
import { dbConnect } from './utils/dbConnect'

// import routes
import accountRoutes from './services/account/handler'

// configure the dotenv
dotenv.config()

// create express app
const app = express();

// connect to database
dbConnect()

// use other middlewares
app.use(response)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

// routes
app.get("/", (req, res, next) => {
  return res.success('Welcome to Onyinye.ng REST API!')
})
app.use('/account', accountRoutes)

// catch 404 and forward to error handler
app.use(function (_req, res, next) {
  const error = createError(404)
  return res.error(error.message, undefined, error.statusCode)
})

// error handler
app.use((err: any, req: Request, res: Response) => {
  // req.app.get('env') === 'production'
  console.log(err)
  
  return res.error(
    err.status === 500
      ? 'Server Error! Please try again.' : err.message,
    undefined, err.status || 500
  )
})

// export default app;
export const handler = ServerlessHttp(app);
