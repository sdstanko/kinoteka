import multer from 'multer'
import {v4 as uuidv4} from 'uuid'

// const storage = multer.diskStorage({
// 	destination(req, file, cb) {
// 		cb(null, 'static/')
// 	},
// 	filename(req, file, cb) {
// 		cb(null, uuidv4() + '.jpg')
// 	}
// })

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


export default upload