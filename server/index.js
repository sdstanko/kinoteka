import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
// import fileUpload from 'express-fileupload'
import router from './routes/index.js'
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
import {errorHandler} from './middlewares/errorHandlingMiddleware.js'

const app = express()
const PORT = config.get('serverPort') || 4001
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
// app.use(fileUpload({}))
app.use('', router)

app.use(errorHandler)

const start = async () => {
	try {
		mongoose.connect(config.get('dbUrl')) 
		app.listen(PORT, () => console.log('app started on port ' + PORT))
	} catch (e) {

	}
}

start()