import { Router } from 'express'
import { getPublicCollections, getUserCollections } from '../controllers/indexController.js'
import { userValid } from '../middlewares/auth.js'

export const route = new Router()

route.get('/gallery', userValid, getUserCollections)
route.get('/', getPublicCollections)
