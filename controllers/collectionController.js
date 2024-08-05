import prisma from '../services/db.js'
import { formatImageSource } from '../utils/imageFormat.js'

function getForm (req, res, next) {
  if (req.user) {
    res.render('create', { user: req.user })
  } else {
    res.redirect('/login')
  }
}

async function createCollection (req, res, next) {
  const user = req.user
  const { id } = user
  const { title, publish, description } = req.body
  if (!user) {
    res.redirect('login')
  }
  const newCollection = await prisma.collection.create({
    data: {
      name: title,
      publish: publish === 'on',
      description,
      userId: id
    }
  })
  res.redirect(`/collection/${newCollection.id}`)
}

async function getCollection (req, res, next) {
  const { id } = req.params

  const collection = await prisma.collection.findUnique({ where: { id }, include: { user: true, images: true } })
  const images = collection.images.map((image) => {
    return formatImageSource(image)
  })

  const permissions = collection.userId === req.user?.id
  res.render('collection', { user: req.user, collection, images, permissions })
}

async function getEditForm (req, res, next) {
  const { id } = req.params
  const collection = await prisma.collection.findUnique({ where: { id } })
  res.render('edit-collection', { user: req.user, collection })
}

async function editCollection (req, res, next) {
  const { id } = req.params
  const { title, publish, description } = req.body
  const collection = await prisma.collection.update({
    where: { id },
    data: {
      name: title,
      publish: publish === 'on',
      description
    }
  })
  res.redirect(`/collection/${collection.id}`)
}
async function deleteCollection (req, res, next) {
  const { id } = req.params
  await prisma.collection.delete({ where: { id } })
  res.redirect('/galery')
}
export const collectionManager = { getForm, createCollection, getCollection, getEditForm, editCollection, deleteCollection }
