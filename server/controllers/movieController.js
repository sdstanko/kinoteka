import {v4 as uuidv4} from 'uuid'
import path from 'path'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
import config from 'config'
import { UserModel } from '../models/User.js';
import { MovieModel } from '../models/Movie.js';
import ApiError from '../error/ApiError.js';

class MovieController {

	constructor() {
		this.userModel = new UserModel()
		this.model = new MovieModel()
	}

	async create(req, res, next) {
		try {
			const {_id: userId} = req.body
			const movieData = req.body
			const movie = await this.model.create(movieData)

			await this.userModel.addToCreated(movie._id, userId)
 
        	return res.json(movie)
		} catch (e) {
			return next(ApiError.internal('Server error'))
		}
	}

	// async uploadCover (req, res) {
	// 	console.log(req.files.cover)
	// 	const {_id} = req.body
	// 	let response
	// 	let cover

	// 	if (req.files) {
	// 		cover = req.files.cover
	// 		let fileName = uuidv4() + '.jpg'
	// 		cover.mv(path.resolve(__dirname, '..', 'static', fileName))
	// 		response = await this.model.uploadCover(fileName, _id)
	// 	} else {
	// 		cover = req.body.cover
	// 		response = await this.model.uploadCover(cover, _id)
	// 	}
		
	// 	return res.json(response)
	// }

	async uploadCover (req, res) {
		const {_id, url} = req.body
		let response
		try {
			if (req.file) {
				response = await this.model.uploadCover(url, _id)
			} 
		} catch (e) {

		}

		return res.json(response)
	}

	async update(req, res) {
		const response = await this.model.update(req.body)
		return res.json(response)
	}

	async getAll(req, res) {
		let movies = await this.model.getAll()
		return res.json(movies)
	}

	async findById(req, res) {
		const {id} = req.params 
        const movie = await this.model.findById(id)
        return res.json(movie)
	}

	async findByAllIds(req, res) {
		const {ids} = req.query 
        const movies = await this.model.findByAllIds(ids)
        return res.json(movies)
	}
	
	
	async getByGenre(req, res) {
		const {id} = req.params
		console.log(id.split('&'))

		const movies = await this.model.getByGenre(id)
        
		return res.json(movies)
	}

	async getByFilters(req, res) {
		const queryObj = req.query
		let movies = await this.model.getByFilters(queryObj)

		return res.json(movies)
	}

	async deleteAll() {
		await this.model.deleteAll()
	}

	async getAllCountriesAndSortByPopular() {
		
	}
}
 
export default new MovieController()