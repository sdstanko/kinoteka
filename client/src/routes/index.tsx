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
    path: '/', 
    element: <Main/>
  },
  {
    path: "/movie/:id",
    element: <MoviePage/>,
  },
  {
    path: "/movie/:id",
    element: <MoviePage/>,
  },
  {
    path: "/search",
    element: <SearchPage/>,
  }
]

export const publicRoutes: IRoute[] = [
   {
    path: "/login",
    element: <Auth/>,
  },
  {
    path: "/registration",
    element: <Auth/>,
  },
  {
    path: "*",
    element: <Auth/>,
  }
]

export const privateRoutes: IRoute[] = [
	{
    path: "/add-movie",
    element: <AddMovie/>,
  },
  {
    path: "/add-movie/:id",
    element: <AddMovie/>,
  },
  {
    path: "/watchlist/",
    element: <MyWatchList/>,
  },
  {
    path: "/profile/",
    element: <MyProfile/>,
  },
  {
    path: "*",
    element: <Main/>
  }
]
