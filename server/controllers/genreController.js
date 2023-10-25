import Genre from '../models/Genre.js'
import config from 'config'

class GenreController {
	async create(req, res) {
		try {
			const {name} = req.body

			const candidate = await Genre.findOne({name})
			if (candidate) {
				return res.status(400).json({message: 'Genre with this name already exists'})
			}

			const genre = new Genre({name})
			await genre.save()
        	return res.json(genre)
		} catch (e) {
			console.log(e)
			res.send({message: 'Server error'})
		}
	}

	async getAll(req, res) {
		let genres = await Genre.find()
		return res.json(genres)
	}
}

export default new GenreController()