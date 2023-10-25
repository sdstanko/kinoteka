import {Schema, model} from 'mongoose'

const MovieSchema = new Schema({
	title: {type: String, unique: true},
	description: {type: String},
	duration: {type: String},
	release: {type: Object},
	country: {type: String},
	cover: {type: String},
	genres: [{type: String, ref: 'Genres'}],
})
const Movie = model('Movie', MovieSchema) 

export class MovieModel {

	async create(movie) {
		const {title, description, duration, release, country, genres, _id: userId} = movie
			
		const candidate = await Movie.findOne({title})
		if (candidate) {
			return next(ApiError.internal('Movie with this title already exists'))
		}

		const newMovie = new Movie({title, description, duration, release, country, genres})
		return await newMovie.save()
	}

	async update(movie) {
		return Movie.findOneAndUpdate({_id: movie._id}, {
			title: movie.title,
			description: movie.description,
			duration: movie.duration,
			country: movie.country,
			genres: movie.genres,
			release: movie.release,
		}, {returnDocument: 'after'})
	}

	async uploadCover(cover, _id) {
		return Movie.findOneAndUpdate({_id: _id}, {
			cover: cover
		}, {returnDocument: 'after'})
	}

	async getAll() {
		return await Movie.find()
	}

	async findById(id) {
		return await Movie.findOne({_id: id})
	}

	async findByAllIds(ids) {
		return await Movie.find({_id: {$in: ids}})
	}

	async getByGenre(id) {
		return await Movie.find({
			genres: {
				$all: id.split('&')
			}
		})
	}


	async getByFilters(queryObj) {
		const filteredQuery = {}

		for (let query in queryObj) {
			
			switch (query) {
				case 'q': 
					filteredQuery.title = {$eq: queryObj.q}
					break;

				case 'rating': 
					filteredQuery.rating = {$gt: +queryObj.rating}
					break;

				case 'genre': 
					filteredQuery.genres = {$in: queryObj.genre}
					break;

				case 'country': 
					filteredQuery.country = {$eq: queryObj.country}
					break;

				case 'yearFrom': 
					filteredQuery["release.year"] = {$gte: +queryObj.yearFrom}
					break;

				case 'yearTo': 
					filteredQuery["release.year"] = {$lte: +queryObj.yearTo}
					break; 
			}
		}

		return await Movie.find(filteredQuery)
	}

	async deleteAll() {
		await Movie.deleteMany()
	}

	async getAllCountriesAndSortByPopular() {
		const allMovies = await Movie.find()
		let countryCount = {}

		allMovies.forEach((item) => {
			const country = item.country

			if (countryCount[country]) {
				countryCount[country] += 1
			} else {
				countryCount[country] = 1
			}
		})

		const sortedArr = Object.entries(countryCount).sort(([,a],[,b]) => b - a)
		const result = []
		sortedArr.forEach((item) => {
			result.push(item[0])
		})
		result.reverse()

		return result
	}

}