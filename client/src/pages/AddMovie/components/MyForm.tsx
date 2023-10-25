import { FormikErrors, withFormik } from "formik";
import { IAddMovieForm } from "../../../types/IAddMovieForm";
import { IMovie } from "../../../types/IMovie";
import InnerForm from "./InnerForm";

// The type of props MyForm receives
export interface MyFormProps {
	isEditing?: boolean
	existingMovie?: IMovie
	sendData?: (movie: IAddMovieForm) => Promise<void>
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, IAddMovieForm>({
// Transform outer props into form values
	mapPropsToValues: (props) => {
	const movie = props.existingMovie
	
	return {
		title: movie?.title || '',
		description: movie?.description || '',
		genres: movie?.genres || [],
		country: movie?.country || '',
		release: movie?.release || {day: 1, month: 1, year: 1970},
		duration: movie?.duration || '',
		cover: movie?.cover || null
	};
},

// Add a custom validation function (this can be async too!)
	validate: (values: IAddMovieForm, props) => {
		let errors: FormikErrors<IAddMovieForm> = {};
		if (!values.title) {
			errors.title = 'Required'
		}
		if (!values.description) {
			errors.description = 'Required'
		}
		if (values.genres.length === 0) {
			errors.genres = 'Required';
		} 
		if (!values.duration) {
			errors.duration = 'Required'
		} 
		if (!values.cover) {
			errors.cover = 'Required'
		} 

		return errors;
	},

	handleSubmit: async (values, props) => {
		if (props.props.sendData) {
			props.props.sendData(values)
		}
	},
})(InnerForm);

export default MyForm