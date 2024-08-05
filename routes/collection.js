import { Router } from 'express'
import { collectionManager } from '../controllers/collectionController.js'
import ImageController from '../controllers/imageController.js'
import upload from '../middlewares/multer.js'
import { controlCollection, userCollection, userValid } from '../middlewares/auth.js'

export const route = Router()

route.post('/:id/add', userValid, controlCollection, upload.single('image'), ImageController.addImage)
route.post('/:id/edit', userValid, controlCollection, collectionManager.editCollection)
route.get('/:id/delete', userValid, controlCollection, collectionManager.deleteCollection)

route.get('/:id/add', userValid, controlCollection, ImageController.getForm)
route.get('/:id/edit', userValid, controlCollection, collectionManager.getEditForm)

route.post('/new', userValid, collectionManager.createCollection)
route.get('/new', userValid, collectionManager.getForm)

route.get('/:id', userCollection, collectionManager.getCollection)
