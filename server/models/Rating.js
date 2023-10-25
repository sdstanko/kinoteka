import {Schema, model, ObjectId, Types} from 'mongoose'

const RatingSchema = new Schema({
	userId: {type: ObjectId, required: true, unique: true},
	movieId: {type: ObjectId, required: true, unique: true},
	rate: {type: Number, required: true}
})

export default model('Raring', RatingSchema)