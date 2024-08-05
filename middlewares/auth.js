import prisma from '../services/db.js'

export function userValid (req, res, next) {
  if (!req.user) {
    res.redirect('/login')
  } else {
    next()
  }
}

export async function userCollection (req, res, next) {
  const { id } = req.params
  const collection = await prisma.collection.findUnique({ where: { id } })
  const condition = collection ? !collection.publish && collection.userId !== req.user?.id : true
  action(condition, res, next)
}

export async function controlCollection (req, res, next) {
  const { id } = req.params
  const collection = await prisma.collection.findUnique({ where: { id } })
  const condition = collection ? collection.userId !== req.user?.id : true
  action(condition, res, next)
}

export async function userImage (req, res, next) {
  const { id } = req.params
  const collection = await prisma.collection.findFirst({ where: { images: { some: { id } } } })
  const condition = collection ? !collection.publish && collection.userId !== req.user?.id : true
  action(condition, res, next)
}

export async function controlImage (req, res, next) {
  const { id } = req.params
  const collection = await prisma.collection.findFirst({ where: { images: { some: { id } } } })
  const condition = collection ? collection.userId !== req.user?.id : true
  action(condition, res, next)
}

function action (condition, res, next) {
  if (condition) {
    res.redirect('/')
  } else {
    next()
  }
}
