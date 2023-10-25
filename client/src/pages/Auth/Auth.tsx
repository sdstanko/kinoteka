import React, {FC, useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode'
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import { useCreateUserMutation, useLoginUserMutation } from "../../services/UserService";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setIsAuth, setUser } from "../../store/slices/userSlice";
import styles from './Auth.module.scss'
import AuthForm from "./AuthForm";
import { IAuthForm } from "../../types/IAuthForm";
import Spinner from "../../components/UI/Spinner/Spinner";


const Auth: FC = () => {
	const [createUser, {isLoading: isRegisterLoading}] = useCreateUserMutation()
	const [login, {isLoading: isLoginLoading}] = useLoginUserMutation()
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const isRegistration = location.pathname === '/registration'

	const resetAuthError = () => {
		setError('')
	}

	useEffect(() => {
		if (isRegisterLoading || isLoginLoading) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [isRegisterLoading, isLoginLoading])

	const click = async ({email, password, name, surname}: IAuthForm) => {

		try {
			if (isRegistration) {

				let user = {
					email,
					password,
					name,
					surname
				}
				const data = await createUser(user).unwrap()
				localStorage.setItem('token', data.token)
				const decoded = jwt_decode(data.token)
				dispatch(setUser(decoded))
			} else {
				let user = {email, password}
				const data = await login(user).unwrap()
				localStorage.setItem('token', data.token)
				const decoded = jwt_decode(data.token)
				dispatch(setUser(decoded))
			}
			dispatch(setIsAuth(true))
			navigate('/kinoteka')

		} catch (e: any) {
			setError(e.data.message)
		}
	}

	return (
		<>
			<Header/>
			<Container>
				<div className={styles.auth}>
				<h1 className={styles.title}>{isRegistration ? 'Sign Up' : 'Sign In'}</h1>
				{isLoading ?
				<Spinner />
				:
				<>
					<div className={styles.authError}>{error}</div>
					<AuthForm isRegistration={isRegistration} sendData={click} resetAuthError={resetAuthError} isLoading={isLoading}/>
				</>}
				</div>
			</Container>
		</>
	);
}
 
export default Auth;