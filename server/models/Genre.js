import {Schema, model, ObjectId, Types} from 'mongoose'

const GenresSchema = new Schema({
	name: {type: String, required: true, unique: true},
})

export default model('Genres', GenresSchema)