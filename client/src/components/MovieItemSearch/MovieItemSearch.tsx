import React, {FC} from "react"
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { IMovie } from "../../types/IMovie";
import WatchListToggle from "../UI/WatchListToggle/WatchListToggle";
import styles from './MovieItemSearch.module.scss'


interface MovieItemSearchProps {
	movie: IMovie
}

const MovieItemSearch: FC<MovieItemSearchProps> = ({movie}) => {
	const userId = useAppSelector(store => store.user.user._id) 
	const navigate = useNavigate()
	const mapGenres = (genres: string[]) => {
		return genres.join(', ')
	}

	return (
		<div className={styles.movieItem} onClick={() => navigate('/movie/' + movie._id)}>
			<div className={styles.movieItem__img}>
				<img src={movie.cover}/>
			</div>
			<div className={styles.movieItem__body}>
				<div>
					<div className={styles.movieItem__title}>{movie.title}</div>
					<div className={styles.movieItem__row}>{`${movie.release.year}, ${movie.duration} min.`}</div>
					<div className={styles.movieItem__genres}>
						{mapGenres(movie.genres)}
					</div>
				</div>
				<WatchListToggle
					movieId={movie._id}
					userId={userId}
					additionalClassName={styles.movieItem__button}
					stopPropagation
				/>
			</div>
		</div>
	)
}

export default MovieItemSearch;	