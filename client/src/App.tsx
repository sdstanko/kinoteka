import React, { useEffect } from 'react';
import './App.css'
import { RouterProvider } from "react-router-dom";

import { useCheckQuery } from './services/UserService';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setIsAuth, setUser } from './store/slices/userSlice';
import jwt_decode from 'jwt-decode'
import AppRouter from './routes/AppRouter';

function App() {

  const {data: response} = useCheckQuery('')
  const token = response?.token
  
  const dispatch = useAppDispatch()
  
	useEffect(() => {
		if (token) {
			dispatch(setIsAuth(true))
			const user = jwt_decode(token)
			dispatch(setUser(user))
		}

	}, [token])
  
  const router = AppRouter()
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
