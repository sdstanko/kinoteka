import Router from 'express'
const router = new Router()

import userRouter from './userRouter.js'
import movieRouter from './movieRouter.js'
import genresRouter from './genresRouter.js'

router.use('/user', userRouter)
router.use('/movie', movieRouter)
router.use('/genre', genresRouter)

export default router
