import {Schema, model, ObjectId, Types} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import ApiError from '../error/ApiError.js'


const UserSchema = new Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	role: {type: String, default: 'USER'},
	name: {type: String, required: true},
	surname: {type: String, required: true},
	avatar: {type: String},
	watchlist: [{type: Types.ObjectId, ref: 'Movie'}],
	created: [{type: Types.ObjectId, ref: 'Movie'}]
})
const User = model('User', UserSchema)

const generateJwt = (_id, name, surname, role) => {
    return jwt.sign(
        {_id, name, surname, role},
		config.get("secretKey"),
        {expiresIn: '24h'}
    )
}

export class UserModel {

	async create(user) {
		const {email, password, name, surname} = user

		const candidate = await User.findOne({email})
		if (candidate) {
			return next(ApiError.badRequest('User with this email already exists'))
		}

		const hashPassword = await bcrypt.hash(password, 7)
		const newUser = new User({email, password: hashPassword, name, surname})
		await newUser.save()

		const token = generateJwt(newUser._id, newUser.name, newUser.surname, newUser.role)
		return token
	}

	async login(user) {
		const existingUser = await User.findOne({email: user.email})

		if (!existingUser) {
			return next(ApiError.badRequest('User with this email not found'))
		}
		let comparePassword = bcrypt.compareSync(user.password, existingUser.password)
		if (!comparePassword) {
			return next(ApiError.forbidden('Incorrect password'))
		}

		return generateJwt(existingUser._id, existingUser.name, existingUser.surname, existingUser.role)
	}

	async check(user) {
		return generateJwt(user._id, user.name, user.surname, user.role)
	}

	async uploadAvatar(avatar, _id) {
		return User.findOneAndUpdate({_id: _id}, {
			avatar: avatar
		}, {returnDocument: 'after'})
	}

	async findOne(value) {
		return User.findOne(value)
	}

	async hasInWatchList(movieId, userId) {
		const user = await User.findOne({_id: userId})
		const arr = JSON.stringify(user.watchlist)
		return arr.includes(movieId)
	}

	async canEdit(movieId, userId) {
		const user = await User.findOne({_id: userId})
		const arr = JSON.stringify(user.created)
		return arr.includes(movieId)
	}

	async addToCreated(movieId, userId) {
		return User.findOneAndUpdate({_id: userId}, {
			$push: {
				created: movieId
			}}, {returnDocument: 'after'})
	}

	async toggleWatchList(movieId, userId) {
		let hasInWatchList = await this.hasInWatchList(movieId, userId)

		if (!hasInWatchList) {
			return User.findOneAndUpdate({_id: userId}, {
				$push: {
					watchlist: movieId
				}}, {returnDocument: 'after'})
		} else {
			return User.findOneAndUpdate({_id: userId}, {
				$pull: {
					watchlist: movieId
				}}, {returnDocument: 'after'})
		}
	}

	async getWatchlistIds(userId) {
		const user = await User.findById(userId)
		return user.watchlist
	}

}
