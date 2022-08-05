import express from 'express'
const router = express.Router()

router.get("/", (req, res, next) => {
  return res.success('Welcome to account service!')
})

export default router