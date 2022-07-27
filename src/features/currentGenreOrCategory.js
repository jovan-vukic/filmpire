import { createSlice } from '@reduxjs/toolkit';

export const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState: { //object with the next three properties
    genreIdOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCategory: (oldState, action) => {
      oldState.genreIdOrCategoryName = action.payload;
      oldState.searchQuery = '';
    },
    searchMovie: (oldState, action) => {
      oldState.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

export default genreOrCategory.reducer;
