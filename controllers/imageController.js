import cloudinary from '../services/cloudinary.js'
import prisma from '../services/db.js'
import { formatImageSource } from '../utils/imageFormat.js'

function getForm (req, res) {
  res.render('add-image', { user: req.user })
}

async function addImage (req, res, next) {
  const { id } = req.params
  const { title } = req.body
  try {
    const result = await cloudinary.uploader.upload(req.file.path, { folder: 'collections' })
    await prisma.image.create({
      data: {
        id: result.asset_id,
        name: title ?? result.original_filename,
        image: result.public_id,
        format: result.format,
        width: Number(result.width),
        height: Number(result.height),
        collectionId: id
      }
    })
    res.redirect(`/collection/${id}`)
  } catch (err) { next(err) }
}

async function getImage (req, res, next) {
  const { id } = req.params
  const imageData = await prisma.image.findUnique({
    where: { id },
    include: {
      collection: {
        select: { name: true, userId: true }
      }
    }
  })
  const permissions = imageData.collection.userId === req.user?.id
  const info = { collectionName: imageData.collection.name }
  const image = formatImageSource(imageData, info)
  res.render('image', { user: req.user, image, permissions })
}

async function getEditImage (req, res, next) {
  const { id } = req.params
  const result = await prisma.image.findUnique({ where: { id } })
  const image = formatImageSource(result)
  res.render('edit-image', { user: req.user, image })
}
async function editImage (req, res, next) {
  const { id } = req.params
  const result = await prisma.image.update({ where: { id }, data: { name: req.body.title } })
  res.redirect(`/collection/${result.collectionId}`)
}
async function deleteImage (req, res, next) {
  const { id } = req.params
  const result = await prisma.image.delete({ where: { id } })
  res.redirect(`/collection/${result.collectionId}`)
}

const ImageController = { getForm, getImage, addImage, getEditImage, editImage, deleteImage }
export default ImageController
