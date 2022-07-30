import React, { useState } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList, Pagination, FeaturedMovie } from '..';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery }); //fetching data from an API

  const lgDevice = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMoviesToShow = lgDevice ? 17 : 19; //notice: data?.results?.length === 20

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">An error has occured.</Typography>
      </Box>
    );
  }

  if (!data?.results?.length) { //if a person searches for a movie...
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
    <>
      <FeaturedMovie movie={data?.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMoviesToShow} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />
    </>
  );
}

export default Movies;
