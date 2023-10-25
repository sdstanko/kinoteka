import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { movieAPI } from '../services/MovieService';
import { genreAPI } from '../services/GenreService';
import { userAPI } from '../services/UserService';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
   [movieAPI.reducerPath]: movieAPI.reducer,
   [genreAPI.reducerPath]: genreAPI.reducer,
   [userAPI.reducerPath]: userAPI.reducer,
    user: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(movieAPI.middleware, genreAPI.middleware, userAPI.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
