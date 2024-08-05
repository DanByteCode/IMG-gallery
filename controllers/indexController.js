import prisma from '../services/db.js'
import { getPreviewSource } from '../utils/imageFormat.js'

export async function getPublicCollections (req, res, next) {
  const list = await getCollections({ publish: true }, req.user?.id)
  res.render('index', { user: req.user, list })
}

export async function getUserCollections (req, res, next) {
  const list = await getCollections({ userId: req.user?.id }, req.user?.id)
  res.render('gallery', { user: req.user, list })
}

async function getCollections (condition, currentUser) {
  const consult = await prisma.collection.findMany({
    where: condition,
    include: {
      user: { select: { name: true } },
      images: {
        select: { image: true, format: true },
        orderBy: {
          creation: 'desc'
        }
      }
    }
  })
  const list = consult.map((data) => {
    return {
      ...data,
      permissions: data.userId === currentUser,
      urlPrev: getPreviewSource(data.images[0])
    }
  })
  return list
}
