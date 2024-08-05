import { Router } from 'express'
import ImageController from '../controllers/imageController.js'
import { controlImage, userImage, userValid } from '../middlewares/auth.js'

export const route = Router()

route.post('/:id/edit', userValid, controlImage, ImageController.editImage)
route.get('/:id', userImage, ImageController.getImage)
route.get('/:id/edit', userValid, controlImage, ImageController.getEditImage)
route.get('/:id/delete', userValid, controlImage, ImageController.deleteImage)
