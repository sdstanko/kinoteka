import React, {FC, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateMovieMutation, useFetchOneMovieQuery, useUpdateMovieMutation, useUploadCoverMutation } 
from "../../../services/MovieService";
import { useAppSelector } from "../../../store/hooks";
import { IAddMovieForm } from "../../../types/IAddMovieForm";
import MyForm, { MyFormProps } from './MyForm' 


// Use <MyForm /> wherevs
const AddMovieForm: FC<MyFormProps> = () => {
	const [addMovieData, {}] = useCreateMovieMutation()
	const [updateMovieData, {}] = useUpdateMovieMutation()
	const [uploadCover, {}] = useUploadCoverMutation()
	
	const {id: movieId} = useParams()
	const [isEditing, setIsEditing] = useState(true)
	const userId = useAppSelector(store => store.user.user._id)
	const navigate = useNavigate()
	
	useEffect(() => {
		if (!movieId) {
			setIsEditing(false)
		}
	}, [])
	
	const {data: existingMovieData, isLoading} = useFetchOneMovieQuery(movieId ? movieId : '')
	
	const sendMovie = async (movie: IAddMovieForm) => {
		const movieBody = {...movie, cover: '', _id: isEditing ? movieId : userId}
		const responseMovie = isEditing ? await updateMovieData(movieBody).unwrap() : await addMovieData(movieBody).unwrap()

		const coverForm = new FormData()
		coverForm.append('_id', responseMovie._id)
		
		if (movie.cover !== null) {
			coverForm.append('cover', movie.cover)
		}

		await uploadCover(coverForm).unwrap()
		navigate('/kinoteka/movie/' + responseMovie._id)
	}
	
	return (
		<div>
			{
				isEditing ? 
					isLoading ? 'Loading...' : <MyForm sendData={sendMovie} existingMovie={existingMovieData} isEditing={isEditing}/>
				: <MyForm sendData={sendMovie}/>
			}
		</div>
		
	)
};

export default AddMovieForm;