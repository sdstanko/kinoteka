import FormData from 'form-data'
import fetch from 'node-fetch'

async function imgbbMiddleware(req, res, next) {
	const base64Img = req.file.buffer.toString('base64')
	const form = new FormData();
	form.append('image', base64Img);


	const response = await fetch('https://api.imgbb.com/1/upload?key=df725b358fb4e95113e4607d13418e72', {
		method: 'POST',
		body: form
	});

	const result = await response.json()

	const url = result.data.url
	req.body.url = url
	next()
}
 
export default imgbbMiddleware