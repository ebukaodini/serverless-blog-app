import express from 'express'
import { body, validationResult } from 'express-validator'
import { mergeValidationErrors } from '../../utils/mergeValidationErrors'
import Users, { UserInterface } from '../../models/user.model'
import { generate, verify } from 'password-hash'
import { sign } from 'jsonwebtoken'

const router = express.Router()

router.get("/", (req, res, next) => {
  return res.success('Welcome to account service!')
})

router.post('/register',
  body('firstname', 'Invalid firstname').isString(),
  body('lastname', 'Invalid lastname').isString(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'Invalid password').isStrongPassword(),
  async (req, res, next) => {
    try {
      // throw validation error
      const errors = validationResult(req).array();
      if (errors.length > 0)
        return res.error('Invalid fields', mergeValidationErrors(errors))

      // extract fields
      const { firstname, lastname, email, password } = req.body
      // hash password
      const hashedPassword = generate(password)
      // create account
      Users.create({ firstname, lastname, email, password: hashedPassword }).then((user: UserInterface) => {
        return res.success('Account created!')
      })
    } catch (error) {
      next(error)
    }
  })

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body

    Users.findOne({ email }).then((user: UserInterface | null) => {

      if (user === null)
        return res.error('Invalid email/password')

      if (verify(password, user.password) === true) {
        const token = sign({ user: user }, '12345', { expiresIn: '7200s' });
        return res.success('Login successful', {
          authToken: token,
          user: user._id
        })
      } else return res.error('Invalid email/password')
    })
  } catch (error) {
    next(error)
  }
})

export default router