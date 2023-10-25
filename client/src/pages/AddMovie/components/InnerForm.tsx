import { Field, Form, FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import CustomSelect from "../../../components/UI/CustomSelect/CustomSelect";
import { IAddMovieForm } from "../../../types/IAddMovieForm";
import { IMovie } from "../../../types/IMovie";
import styles from '../AddMovie.module.scss'
import {countryList, genresList} from '../../../data'

import createRangeOfNumbers from '../../../utils/createRangeOfNumbers'

// interface OtherProps {
// 	// isEditing: boolean
// 	// existingMovie?: IMovie
// }

type OtherProps = {
	isEditing: true
	existingMovie: IMovie
} | {
	isEditing: false
	existingMovie: undefined
}

// Aside: You may see InjectedFormikProps<OtherProps, AuthFormType> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<IAddMovieForm>) => {
	const {isEditing, existingMovie} = props;

	const [file, setFile] = useState<File | null>(null)
	const [src, setSrc] = useState('')
	const uploadInput = useRef<HTMLInputElement>(null)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		if (isEditing) {
			setSrc(existingMovie.cover)
		}
	}, [])

	const setFileHandler = (e: React.ChangeEvent<HTMLInputElement>, setFormikValue: any) => {
		if (e.currentTarget.files) {
			setFile(e.currentTarget.files[0])
			setFormikValue('cover', e.currentTarget.files[0])

			setSrc(URL.createObjectURL(e.currentTarget.files[0]))
		}
	}

	const selectUploadInput = (e: React.KeyboardEvent) => {
		if (e.key === 'Tab') {
			return
		}
		uploadInput?.current?.select()
	}

	const formatValues = (array: string[]) => {
		return array.map((el) => ({value: el, label: el}))
	}

	const showErrors = () => {
		if (Object.keys(props.errors).length > 0) {
			setIsError(true)
		} else {
			setIsError(false)
		}
	}

	return (
		<Form className={styles.form}>
			<label htmlFor="title">Title</label>
			<Field 
				id="title" 
				name="title" 
				type="text" 
				className={[styles.title, styles.field].join(' ')} 
			/>
			<label htmlFor="description">Description</label>
			<Field as="textarea" 
				name="description" 
				id="description" 
				className={[styles.description, styles.field].join(' ')} 
			/>
			<label>Genres</label>
			<CustomSelect
				value={formatValues(props.values.genres)}
				isMulti={true}
				onChange={value => props.setFieldValue('genres', value)}
				options={genresList}
				className={styles.genres}
			/>
			<div className={styles.form__row}>
				<div className={styles.release__row}>
					<label>Release date</label>
					<div className={styles.release__inner}>
						<CustomSelect
							value={props.values.release.day}
							onChange={value => props.setFieldValue('release.day', value.value)}
							options={createRangeOfNumbers(31, 1)}
							className={styles.dateSelect}
						/>
						<CustomSelect
							value={props.values.release.month}
							onChange={value => props.setFieldValue('release.month', value.value)}
							options={createRangeOfNumbers(12, 1)}
							className={styles.dateSelect}
						/>
						<CustomSelect
							value={props.values.release.year}
							onChange={value => props.setFieldValue('release.year', value.value)}
							options={createRangeOfNumbers(55, 1970)}
							className={styles.dateSelect}
						/>
					</div>
				</div>
				<div className={styles.durationInput}>
					<label htmlFor="duration">
						<div>Duration</div>
						<Field
							name="duration"
							id="duration"
							type="text"
							className={[styles.duration, styles.field].join(' ')} 
						/>
					</label>
				</div>
				<div className={styles.country}>
					<label>Country</label>
					<CustomSelect
						value={props.values.country}
						onChange={value => props.setFieldValue('country', value.value)}
						options={countryList}
						className={styles.dateSelect}
					/>
				</div>
			</div>
			<div className={styles.cover__row}>
				<label className={styles.uploadInput} htmlFor="cover">
					<div>Cover</div>
					<input type="file" name="cover" id="cover" className="visually-hidden" onChange={e => setFileHandler(e, props.setFieldValue)} ref={uploadInput}/>
					<div>
						<div tabIndex={0} className={styles.uploadButton} onKeyDown={e => selectUploadInput(e)}>Upload cover</div>
						<span>{file?.name}</span>
					</div>
				</label>
				<img className={styles.coverPreview} src={src}></img>
			</div>
			<div className={styles.error}>{isError ? 'Please fill all fields' : ''}</div>
			<button onClick={showErrors} type="submit" className={styles.addButton}>
				{isEditing ? 'Save changes' : 'Add movie'}
			</button>
		</Form>
	);
};

export default InnerForm