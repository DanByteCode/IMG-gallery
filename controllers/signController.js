import bcrypt from 'bcrypt'
import { config } from '../config.js'
import prisma from '../services/db.js'
function getForm (req, res) {
  res.render('sign-up', { message: false })
}
async function register (req, res, next) {
  const { nickname, username, password } = req.body
  const search = await prisma.user.findUnique({ where: { username } })
  if (!search) {
    try {
      const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS)
      await prisma.user.create({
        data: {
          name: nickname,
          username: username.toLowerCase(),
          password: hashedPassword
        }
      })
      res.redirect('/login')
    } catch (err) {
      next(err)
    }
  } else {
    res.render('sign-up', { message: 'This user already exists' })
  }
}

export const Sign = { getForm, register }
