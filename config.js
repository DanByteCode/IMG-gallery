import dotenv from 'dotenv'
dotenv.config()

export const config = {
  PORT: process.env.PORT || '3000',
  SECRET: process.env.SECRET,
  SALT_ROUNDS: Number.parseInt(process.env.SALT_ROUNDS),
  DATABASE_URL: process.env.DATABASE_URL,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET
}
