import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import { privateRoutes, publicRoutes, routes } from "./index"
import { useAppSelector } from "../store/hooks"


const AppRouter = () => {
	const isAuth = useAppSelector(state => state.user.isAuth)
	
	const routesForAll = routes.map(el => 
		<Route path={el.path} element={el.element} key={el.path}/>
	)

	const router = createBrowserRouter(createRoutesFromElements(
	isAuth 
	?
		privateRoutes.map(el => 
			<Route path={el.path} element={el.element} key={el.path}/>
		).concat(routesForAll)
		
	:
		publicRoutes.map(el => 
			<Route path={el.path} element={el.element} key={el.path}/>
		).concat(routesForAll)
	));

	return (
		router
	);
}

export default AppRouter