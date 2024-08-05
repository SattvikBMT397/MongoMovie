import { configureStore } from '@reduxjs/toolkit';
import  userReducer from '../features/user/userSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


