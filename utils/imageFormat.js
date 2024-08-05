import dateFormat from 'dateformat'
import { urlImg, urlPrev } from '../services/cloudinary.js'

export function formatImageSource (imageData, info) {
  return {
    id: imageData.id,
    name: imageData.name,
    date: dateFormat(imageData.creation, 'd mmm yy'),
    preview: `${urlPrev}/${imageData.image}.${imageData.format}`,
    source: `${urlImg}/${imageData.image}.${imageData.format}`,
    width: imageData.width,
    height: imageData.height,
    collectionId: imageData.collectionId,
    info
  }
}

export function getPreviewSource (imageData) {
  if (!imageData) return `${urlImg}/empty_doh4e5.webp`
  return `${urlPrev}/${imageData.image}.${imageData.format}`
}
