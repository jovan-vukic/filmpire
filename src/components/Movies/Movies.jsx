import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '..';

function Movies() {
  const { data, error, isFetching } = useGetMoviesQuery(); //fetching data from an API

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (error) return 'An error has ocured';

  /*later we will implement search functionality*/
  if (!data.results.length) { //if a person searches for a movie...
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }
  return (
    <MovieList movies={data} />
  );
}

export default Movies;
