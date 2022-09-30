import mongoose from 'mongoose'
import config from './config.js'

export const mongooseConnection = async () => {
	try {
		await mongoose.connect(config.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		console.log('Base de datos online')
	} catch (error) {
		console.log(error)
	}
}