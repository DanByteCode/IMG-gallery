import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'url'
import { config } from './config.js'
import { errorHandler } from './middlewares/error.js'
import setupSession from './middlewares/sesion.js'
import morgan from 'morgan'
import { __express as ejsExpress } from 'ejs'
import { route as indexRouter } from './routes/index.js'
import { route as signRouter } from './routes/sign-up.js'
import { route as loginRouter } from './routes/login.js'
import { route as logoutRouter } from './routes/log-out.js'
import { route as collectionRouter } from './routes/collection.js'
import { route as imageRouter } from './routes/image.js'

const app = express()
setupSession(app)
const dirname = path.dirname(fileURLToPath(import.meta.url))
app.set('view engine', 'ejs')
app.engine('ejs', ejsExpress)
app.set('views', './views')
app.use(morgan('dev'))

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(dirname, 'public')))

app.use('/sign-up', signRouter)
app.use('/login', loginRouter)
app.use('/log-out', logoutRouter)
app.use('/collection', collectionRouter)
app.use('/image', imageRouter)
app.use('/', indexRouter)

app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log('Server online on PORT: ' + config.PORT)
})
