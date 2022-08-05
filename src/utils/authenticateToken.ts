import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { NextFunction, Request } from 'express'

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null)
    return next(createError(401))

  jwt.verify(token, process.env.TOKEN_SECRET!, (error, payload) => {

    if (error) {
      console.log(error.message)
      return next(createError(401))
    }

    // const {user, role} = payload

    // req.user = payload?.user
    // req.role = payload?.role
    next()
  })
}

module.exports = authenticateToken