import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Movie, FavoritesState } from '../../utils/Interfaces';
import { RootState } from '../../app/store';

// Initial state
const initialState: FavoritesState = {
  favorites: [],
};

// Async thunks for API calls

export const fetchFavorites = createAsyncThunk<Movie[], number, { rejectValue: string }>(
  'favorites/fetchFavorites',
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/favorites/${user_id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching favorites');
    }
  }
);

export const addFavorite = createAsyncThunk<Movie, Movie, { rejectValue: string }>(
  'favorites/addFavorite',
  async (movie, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5000/api/favorites/add', movie, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Error adding favorite');
    }
  }
);

export const removeFavorite = createAsyncThunk<{ userId: string, imdbID: string }, { userId: string, imdbID: string }, { rejectValue: string }>(
  'favorites/removeFavorite',
  async ( imdbID, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete('http://localhost:5000/api/favorites/delete', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: imdbID 
      });
      return imdbID ;
    } catch (error) {
      return rejectWithValue('Error removing favorite');
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<Movie[]>) => {
      state.favorites = action.payload;
    });
    builder.addCase(addFavorite.fulfilled, (state, action: PayloadAction<Movie>) => {
      state.favorites.push(action.payload);
    });
    builder.addCase(removeFavorite.fulfilled, (state, action: PayloadAction<{ userId: string, imdbID: string }>) => {
      state.favorites = state.favorites.filter((movie) => movie.imdbID !== action.payload.imdbID);
    });
    builder.addCase(fetchFavorites.rejected, (_, action) => {
      console.error(action.payload);
    });
    builder.addCase(addFavorite.rejected, (_, action) => {
      console.error(action.payload);
    });
    builder.addCase(removeFavorite.rejected, (_, action) => {
      console.error(action.payload);
    });
  },
});

// Selectors
export const selectFavorites = (state: RootState) => state.favorites.favorites;

export default favoritesSlice.reducer;
