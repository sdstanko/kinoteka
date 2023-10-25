import Router from 'express'
import genreController from '../controllers/genreController.js'
const router = new Router()
import authMiddleware from '../middlewares/authMiddleware.js'

router.post('/', genreController.create)
router.get('/', genreController.getAll)

export default router
