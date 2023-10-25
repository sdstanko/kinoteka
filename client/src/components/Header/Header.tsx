import React, {FC, useState, ReactComponentElement, useEffect} from "react";
import Container from "../Container/Container";
import styles from './Header.module.scss'
import { Link, useNavigate } from "react-router-dom";
import searchIcon from '../../assets/icons/search-icon.svg'
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setIsAuth, setUser } from "../../store/slices/userSlice";
import { userAPI } from "../../services/UserService";

const Header: FC = () => {

	const [isActiveMenu, setIsActiveMenu] = useState(false)
	const [searchInput, setSearchInput] = useState('')
	const [src, setSrc] = useState('')

	const isAuth = useAppSelector(store => store.user.isAuth)
	const fullName = useAppSelector(store => store.user.user.name) + ' ' +
	useAppSelector(store => store.user.user.surname)
	const userId = useAppSelector(store => store.user.user._id) 
	const {data: user, isSuccess} = userAPI.useGetUserQuery(userId, {refetchOnMountOrArgChange: true, skip: !userId})
	const dispatch = useAppDispatch()
	const navigate = useNavigate()


	useEffect(() => {
		if (!user) return 
		if (user.avatar) {
			setSrc(user.avatar)
		} else {
			setSrc('https://i.ibb.co/SXJVJzK/user.png')
		}
	}, [user])

	const logout = () => {
		dispatch(setIsAuth(false))
		dispatch(setUser({_id: '', name: '', surname: '', role: ''}))
		localStorage.removeItem('token')
	}

	const setSearchInputHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
		setSearchInput(e.currentTarget.value)
	}

	const redirectByKey = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			const query = createQuery()
			navigate('/search' + query)
		}
	}

	const redirectByClick = () => {
		const query = createQuery()
		navigate('/search' + query)
	}

	const createQuery = () => {
		return '?q=' + searchInput + '&rating=1'
	}

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.header__inner}>
					<div className={styles.header__block}>
						<button 
							onClick={() => setIsActiveMenu(!isActiveMenu)}
							tabIndex={0}
							className={isActiveMenu ? 
								[styles.burger__button, styles.burger__buttonOpen].join(' ') 
								: styles.burger__button}
						>
							{[...Array(3)].map((line, i) => 
								<span key={i} className={styles.burger__line}></span>
							)}
						</button>
						<div 
							className={isActiveMenu ? 
								[styles.burger__menu, styles.burger__menuOpen].join(' ') 
								: styles.burger__menu}
						>
							<ul className={styles.burger__list}>
								<li className={styles.burger__link}><Link to="/">Main</Link></li>
								<li className={styles.burger__link}><Link to="/watchlist">My Watchlist</Link></li>
								<li className={styles.burger__link}><Link to="/add-movie">Add Movie</Link></li>
								<li className={styles.burger__link}><Link to="/search">Search page</Link></li>
							</ul>
						</div>
						<div className={styles.logo}><Link to="/">Kinoteka</Link></div>
					</div>
					<div className={styles.search}>
						<div className={styles.search__item}>
							<input 
								value={searchInput}
								onChange={(e) => setSearchInputHandler(e)}
								onKeyUp={(e) => redirectByKey(e)}
								className={styles.search__input} 
								type="text" 
								placeholder="Search movie by title"
							/>
							<img 
								onClick={redirectByClick}
								className={styles.search__logo} 
								src={searchIcon} 
								alt="" 
							/>
						</div>
					</div>
					<div className={styles.signIn}>
						{isAuth ? 
							<div className={styles.signIn__row}>
								<img className={styles.avatar} src={src} alt="" />
								<Link to='/profile'>{fullName}</Link> | <Link to="/" onClick={logout}>Logout</Link>
							</div>
							:
							<Link to="/login">Sign In</Link>
						}
					</div>
				</div>
			</div>
		</header>
	);
}
 
export default Header;