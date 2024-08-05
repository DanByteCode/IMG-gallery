import { v2 as cloudinary } from 'cloudinary'
import { config } from '../config.js'

const cloudName = config.CLOUD_NAME

export const urlPrev = `https://res.cloudinary.com/${cloudName}/image/upload/c_thumb,w_200,g_face`
export const urlImg = `https://res.cloudinary.com/${cloudName}/image/upload`

cloudinary.config({
  cloud_name: cloudName,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_API_SECRET
})

export default cloudinary
