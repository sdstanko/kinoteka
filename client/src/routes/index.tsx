import React from "react"
import AddMovie from "../pages/AddMovie/AddMovie"
import Auth from "../pages/Auth/Auth"
import Main from "../pages/Main/Main"
import MoviePage from "../pages/MoviePage/MoviePage"
import MyProfile from "../pages/MyProfile/MyProfile"
import MyWatchList from "../pages/MyWatchList/MyWatchList"
import SearchPage from "../pages/SearchPage/SearchPage"

export interface IRoute {
	path: string
	element: React.ReactNode
	exact?: boolean
}

export const routes: IRoute[] = [
	{
    path: '/kinoteka/', 
    element: <Main/>
  },
  {
    path: "/kinoteka/movie/:id",
    element: <MoviePage/>,
  },
  {
    path: "/kinoteka/movie/:id",
    element: <MoviePage/>,
  },
  {
    path: "/kinoteka/search",
    element: <SearchPage/>,
  }
]

export const publicRoutes: IRoute[] = [
   {
    path: "/kinoteka/login",
    element: <Auth/>,
  },
  {
    path: "/kinoteka/registration",
    element: <Auth/>,
  },
  {
    path: "*",
    element: <Auth/>,
  }
]

export const privateRoutes: IRoute[] = [
	{
    path: "/kinoteka/add-movie",
    element: <AddMovie/>,
  },
  {
    path: "/kinoteka/add-movie/:id",
    element: <AddMovie/>,
  },
  {
    path: "/kinoteka/watchlist/",
    element: <MyWatchList/>,
  },
  {
    path: "/kinoteka/profile/",
    element: <MyProfile/>,
  },
  {
    path: "*",
    element: <Main/>
  }
]
