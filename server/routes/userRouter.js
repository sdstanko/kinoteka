import Router from 'express'
const router = new Router()
import userController from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import multerMiddleware from '../middlewares/multerMiddleware.js'
import imgbbMiddleware from '../middlewares/imgbbMiddleware.js'

router.post('/registration', userController.registration.bind(userController))
router.post('/login', userController.login.bind(userController))
router.post('/avatar', authMiddleware, multerMiddleware.single('avatar'), imgbbMiddleware, userController.uploadAvatar.bind(userController))
router.get('/auth', authMiddleware, userController.check.bind(userController))
router.get('/getUser/:id', authMiddleware, userController.getUser.bind(userController))
router.get('/toggleWatchList', authMiddleware, userController.toggleWatchList.bind(userController))
router.get('/hasInWatchList', authMiddleware, userController.hasInWatchList.bind(userController))
router.get('/canEdit/', authMiddleware, userController.canEdit.bind(userController))
router.get('/getWatchlistIds/:id', authMiddleware, userController.getWatchlistIds.bind(userController))  

export default router
