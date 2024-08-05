import { Router } from 'express'
export const route = Router()

route.get('/', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})
