import React, {FC} from "react";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import styles from './AddMovie.module.scss'
import AddMovieForm from "./components/AddMovieForm";

const AddMovie: FC = () => {

	return (
		<>
			<Header/>
			<Container>
				<div className={styles.addMovie}>
					<h1 className={styles.header}>Add movie to catalog</h1>
					<AddMovieForm/>
				</div>
			</Container>
		</>
	);
}
 
export default AddMovie;