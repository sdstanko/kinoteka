import {v4 as uuidv4} from 'uuid'
import path from 'path'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
import bcrypt from 'bcryptjs'
import {UserModel} from '../models/User.js'
import ApiError from '../error/ApiError.js'

class UserController {

	constructor() {
		this.model = new UserModel()
	}

	async registration(req, res, next) {
		try {
			const user = req.body
			if (!user.email || !user.password || !user.name || !user.surname) {
				return next(ApiError.badRequest('Not all values passed to server'))
			}

			const token = await this.model.create(user)
        	return res.json({token})
		} catch (e) {
			return next(ApiError.internal(e.message))
		}
	}

	async login(req, res, next) { 
		try {
			const user = req.body

			const token = await this.model.login(user)
        	return res.json({token})
		} catch (e) {
			return next(ApiError.internal(e.message))
		}
	}

	async check(req, res, next) {
		const user = req.user
        const token = await this.model.check(user)
        return res.json({token}) 
    }

	async uploadAvatar (req, res) {
		const {_id, url} = req.body

		// let avatar = req.files.avatar
		// let fileName = uuidv4() + '.jpg'
		// avatar.mv(path.resolve(__dirname, '..', 'static', fileName))
		let response = await this.model.uploadAvatar(url, _id)

		return res.json(response)
	}

	async getUser(req, res) {
		const {id: userId} = req.params
		if (!userId) return false
		const user = await this.model.findOne({_id: userId})
		return res.json(user)
	}

	async toggleWatchList(req, res, next) {
		const {movieId, userId} = req.query

		if (!movieId || !userId) return false 
		const updatedUser = await this.model.toggleWatchList(movieId, userId)
		return res.json(updatedUser)
	}

	async hasInWatchList(req, res, next) {
		const {movieId, userId} = req.query

		if (!movieId || !userId) return false 
		const value = await this.model.hasInWatchList(movieId, userId)
		return res.json(value)
	}

	async canEdit(req, res, next) {
		const {movieId, userId} = req.query 

		if (!movieId || !userId) return false 
		const value = await this.model.canEdit(movieId, userId)
		return res.json(value)
	}

	async getWatchlistIds(req, res) {
		const {id: userId} = req.params
		const watchListIds = await this.model.getWatchlistIds(userId)
		return res.json(watchListIds)

	}
}

export default new UserController()