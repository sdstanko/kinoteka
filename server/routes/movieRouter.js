import Router from 'express'
import movieController from '../controllers/movieController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import multerMiddleware from '../middlewares/multerMiddleware.js'
import imgbbMiddleware from '../middlewares/imgbbMiddleware.js'
const router = new Router()

router.post('/', authMiddleware, movieController.create.bind(movieController))
router.post('/cover', authMiddleware, multerMiddleware.single('cover'), imgbbMiddleware, movieController.uploadCover.bind(movieController))
router.post('/:id', authMiddleware, movieController.update.bind(movieController))
router.get('/', movieController.getAll.bind(movieController))
router.get('/id/:id', movieController.findById.bind(movieController))
router.get('/genres/:id', movieController.getByGenre.bind(movieController))
router.get('/asd/123', movieController.deleteAll.bind(movieController))
router.get('/countries', movieController.deleteAll.bind(movieController))
router.get('/search', movieController.getByFilters.bind(movieController))
router.get('/findByAllIds', movieController.findByAllIds.bind(movieController))

export default router
 