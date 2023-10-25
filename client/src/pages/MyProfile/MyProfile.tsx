import React, { useRef, useEffect, useState } from "react";
import { arrayBuffer } from "stream/consumers";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import MovieList from "../../components/MovieList/MovieList";
import { movieAPI } from "../../services/MovieService";
import { userAPI } from "../../services/UserService";
import { useAppSelector } from "../../store/hooks";
import styles from './MyProfile.module.scss'


const MyProfile = () => {
	const userId = useAppSelector(store => store.user.user._id) 
	const {data: user, isSuccess} = userAPI.useGetUserQuery(userId, {refetchOnMountOrArgChange: true})
	const [uploadAvatar, {}] = userAPI.useUploadAvatarMutation()
	const uploadInput = useRef<HTMLInputElement>(null)
	const [file, setFile] = useState<File | null>(null)
	const [src, setSrc] = useState('')


	useEffect(() => {
		if (isSuccess && user.avatar) {
			setSrc(user.avatar)
		} else {
			setSrc('https://i.ibb.co/SXJVJzK/user.png')
		}
	}, [isSuccess])


	const setFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files) {
			setFile(e.currentTarget.files[0])
			setSrc(URL.createObjectURL(e.currentTarget.files[0]))
		}
	}

	const selectUploadInput = (e: React.KeyboardEvent) => {
		if (e.key === 'Tab') {
			return
		}
		uploadInput?.current?.select()
	}

	const sendMovie = async () => {

		const coverForm = new FormData()
		coverForm.append('_id', userId)
		if (file !== null) {
			coverForm.append('avatar', file)
		}
		
		await uploadAvatar(coverForm).unwrap()
	}

	useEffect(() => {
		if (file) {
			sendMovie()
		}
	}, [file])

	
	return (
		<>
			<Header/>
			<Container>
				<div className={styles.profile}>
					<div className={styles.profile__body}>
						{/* <div className={styles.profile__photo}> */}
							<img src={src} alt="" className={styles.profile__img}/>
							<label className={styles.uploadInput} htmlFor="cover">
								<input type="file" name="cover" id="cover" className="visually-hidden" onChange={e => setFileHandler(e)} ref={uploadInput}/>
								<div>
									<div tabIndex={0} className={styles.uploadButton} onKeyDown={e => selectUploadInput(e)}>Change avatar</div>
									{/* <span>{file?.name}</span> */}
								</div>
							</label>
						{/* </div> */}
						<div className={styles.profile__name}>{user?.name + ' ' + user?.surname}</div>
					</div>
				</div>
			</Container>

		</>
	);
}
 
export default MyProfile;