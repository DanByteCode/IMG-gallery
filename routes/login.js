import { Router } from 'express'
import { Login } from '../controllers/loginController.js'

export const route = Router()

route.get('/', Login.getForm)
route.post('/', Login.autenticate)
