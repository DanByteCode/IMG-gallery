import { Router } from 'express'
import { Sign } from '../controllers/signController.js'

export const route = Router()

route.get('/', Sign.getForm)
route.post('/', Sign.register)
