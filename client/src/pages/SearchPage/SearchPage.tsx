import React, {useState, useEffect, FC, useRef} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import styles from './SearchPage.module.scss'
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import createRangeSelectValues from '../../utils/createRangeOfNumbers'
import {movieAPI} from '../../services/MovieService'
import MovieList from "../../components/MovieList/MovieList";
import {countryList, yearsForSearch, genresList} from "../../data";
import ISearchFilter from "../../types/ISearchFilter";
import { makeSearchQuery } from "../../utils/makeSearchQuery";
import { parseSearchQuery } from "../../utils/parseSearchQuery";

const SearchPage = () => {
	const [searchFilter, setSearchFilter] = useState<ISearchFilter>({
		q: '',
		rating: 1,
		genre: {value: 'all', label: 'All'},
		country: {value: 'all', label: 'All'},
		year: {value: 'all', label: 'All'},
	})

	const addressLineQuery = document.location.search
	const [query, setQuery] = useState('')
	const {data: filteredMovies, isFetching} = movieAPI.useFetchFilteredMoviesQuery(query, {refetchOnMountOrArgChange: true})

	const navigate = useNavigate()

	useEffect(() => {
		const filteredQuery = makeSearchQuery(searchFilter)
		setQuery(filteredQuery)
	}, [searchFilter])

	useEffect(() => {
		if (query) {
			navigate('/kinoteka/search' + query)
		}
	}, [query])

	useEffect(() => {
		if (addressLineQuery !== query) {
			setQuery(addressLineQuery)
			const initialFilters = parseSearchQuery(addressLineQuery)
			setSearchFilter(initialFilters)
		}
	}, [addressLineQuery])

	return (
		<>
			<Header/>
			<Container>
				<div className={styles.searchPage__inner}>
					<aside className={styles.searchFilters}>
						<div className={styles.selectBlock}>
							<div className={styles.heading}>Rating, from</div>
							<CustomSelect
								value={searchFilter.rating}
								onChange={(selectedYear) => setSearchFilter({...searchFilter, rating: selectedYear})}
								options={createRangeSelectValues(10, 1)}
							/>
						</div>
						<div className={styles.selectBlock}>
							<div className={styles.heading}>Genre</div>
							<CustomSelect
								value={searchFilter.genre.value}
								onChange={(selectedGenre) => setSearchFilter({...searchFilter, genre: selectedGenre})}
								options={genresList}
							/>
						</div>
						<div className={styles.selectBlock}>
							<div className={styles.heading}>Country</div>
							<CustomSelect
								value={searchFilter.country.value}
								onChange={(selectedCountry) => setSearchFilter({...searchFilter, country: selectedCountry})}
								options={countryList}
							/>
						</div>
						<div className={styles.selectBlock}>
							<div className={styles.heading}>Years</div>
							<CustomSelect
								value={searchFilter.year.value}
								onChange={(selectedYear) => setSearchFilter({...searchFilter, year: selectedYear})}
								options={yearsForSearch}
							/>
						</div>
					</aside>
					<div className={styles.searchPage__results}>
						{
							searchFilter.q &&
							<h1 className={styles.title}>Results of search {searchFilter.q}</h1>
						}
						{
							!filteredMovies?.length && !isFetching && <h2>No movies found...</h2>
						}
						<MovieList
							movieData={filteredMovies}
							isLoading={isFetching}
							isSearch
							additionalClassName={styles.movieList}
						/>
					</div>
				</div>
			</Container>
		</>
	);
}
 
export default SearchPage;