import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import { Movie } from '..';

function MovieList({ movies, numberOfMovies, excludeFirst }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.moviesContainer}>
      {movies?.results?.slice(excludeFirst ? 1 : 0, numberOfMovies)?.map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default MovieList;
