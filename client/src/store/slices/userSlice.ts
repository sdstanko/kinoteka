import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  isAuth: boolean
  user: {
    _id: string
    name: string
    surname: string
    role: string
  }
}

const initialState: UserState = {
	isAuth: false,
	user: {
		_id: '',
		name: '',
		surname: '',
		role: ''
	}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})


export const { setIsAuth, setUser } = userSlice.actions

export default userSlice.reducer