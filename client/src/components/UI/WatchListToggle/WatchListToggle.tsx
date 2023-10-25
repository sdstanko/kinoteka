import React, {FC, useEffect, useState} from "react";
import styles from './WatchListToggle.module.scss'
import { userAPI, useHasInWatchListQuery, useToggleWatchListQuery } from "../../../services/UserService";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Spinner from "../Spinner/Spinner";

interface WatchListToggleProps {
	movieId: string
	userId: string
	additionalClassName?: string
	stopPropagation?: boolean
}

const WatchListToggle: FC<WatchListToggleProps> = ({movieId, userId, additionalClassName, stopPropagation}) => {
	const paramsObj = {movieId, userId}
	const params = new URLSearchParams(paramsObj)
	const paramsString = '?' + params
	const [bothParams, setBothParams] = useState(false)
	const [hasInWatchList, setHasInWatchList] = useState<boolean>()
	let {data: hasInWatchListResponse, isFetching, isLoading} = useHasInWatchListQuery(
		paramsString, 
		{
			skip: !bothParams,
			refetchOnMountOrArgChange: true
		}
	)
	const [toggle, result] = userAPI.endpoints.toggleWatchList.useLazyQuery()

	useEffect(() => {
		if (!movieId || !userId) {
			return
		} else {
			setBothParams(true)
		}
	}, [movieId, userId])

	useEffect(() => {
		setHasInWatchList(hasInWatchListResponse)
	}, [hasInWatchListResponse])

	const toggleWatchListHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
		if (stopPropagation) {
			e.stopPropagation()
		}
		if (!userId) {
			alert('Please sign in')
			return
		}

		await toggle(paramsString)
		setHasInWatchList(!hasInWatchList)
	}

	return (
		<>
			{
				isFetching || result.isFetching ? 
					<Spinner/> 
				:
				<button 
					onClick={(e) => toggleWatchListHandler(e)}
					className={hasInWatchList ? 
						[styles.button, additionalClassName, styles.buttonActive].join(' ') 
							: 
						[styles.button, additionalClassName].join(' ')}
				>
					{hasInWatchList ? 'In watchlist' : 'Add to watchlist'}
					<span className={styles.button__icon}></span>
				</button>
			}
		</>
	)
}

export default WatchListToggle