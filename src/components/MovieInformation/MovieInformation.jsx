import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { MovieList } from '..';

import { useGetMovieQuery, useGetRecommendationsQuery, useGetUsersListQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreCategoryIcons from '../../assets/genres and categories';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { userSelector } from '../../features/authUser';

function MovieInformation() {
  const history = useNavigate();
  const classes = useStyles();
  const noImage = 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg';
  const dispatch = useDispatch();

  /*fetching the movie information*/
  const { id } = useParams();
  const { data, error, isFetching } = useGetMovieQuery(id);

  /*adding/removing the movie from the favorites/watchlist*/
  const user = useSelector(userSelector);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const addToFavorites = async () => {
    const baseUrl = 'https://api.themoviedb.org/3';
    await axios.post(`${baseUrl}/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id, //which movie to favorite
      favorite: !isMovieFavorited,
    });

    setIsMovieFavorited((prevState) => !prevState);
  };

  const addToWatchlist = async () => {
    const baseUrl = 'https://api.themoviedb.org/3';
    await axios.post(`${baseUrl}/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id, //which movie to favorite
      watchlist: !isMovieWatchlisted,
    });

    setIsMovieWatchlisted((prevState) => !prevState);
  };

  /*seting the initial value of isMovieFavorited/isMovieWatchlisted*/
  const { data: favoriteMovies, refetch: refetchFavorited } = useGetUsersListQuery({ accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1, list: 'favorite/movies' });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetUsersListQuery({ accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1, list: 'watchlist/movies' });

  useEffect(() => {
    refetchFavorited();
    refetchWatchlisted();
  }, []);

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchlistMovies, data]);

  /*fetching the recommendations*/
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ movieId: id, list: '/recommendations' });

  /*modal state*/
  const [open, setOpen] = useState(false);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button startIcon={<ArrowBack />} onClick={() => history(-1)} color="primary">
          Something has gone wrong - Go back
        </Button>
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} style={{ display: 'flex', marginBottom: '30px', justifyContent: 'center' }}>
        <img
          className={classes.poster}
          src={data?.poster_path ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}` : noImage}
          alt={data?.title}
        />
      </Grid>

      <Grid item container direction="column" lg={7}>
        { /*title, tagline, rating, runtime, spoken languages*/ }
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min | {data?.spoken_languages?.length > 0 ? data?.spoken_languages[0].name : ''}
          </Typography>
        </Grid>

        { /*genres and overview*/ }
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre?.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img src={genreCategoryIcons[genre?.name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>

        { /*top cast*/ }
        <Typography variant="h5" gutterBottom style={{ marginBottom: '15px' }}>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data?.credits?.cast?.slice(0, 6)?.map((character, i) => (
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character?.id}`} style={{ textDecoration: 'none' }}>
              <img
                className={classes.castImage}
                src={character?.profile_path ? `https://image.tmdb.org/t/p/w500/${character?.profile_path}` : noImage}
                alt={character?.name}
              />
              <Typography color="textPrimary">{character?.name}</Typography>
              <Typography color="textSecondary">{character?.character.split('/')[0]}</Typography>
            </Grid>
          ))}
        </Grid>

        <Grid item container style={{ marginTop: '2rem' }} justifyContent="center">
          <div className={classes.buttonsContainer}>
            { /*website, IMDB, trailer*/ }
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(true)} endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>

            { /*favorite, watchlist, back*/ }
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }} onClick={() => history(-1)}>
                  <Typography style={{ textDecoration: 'none' }} color="inherit" variant="subtitle2">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>

      { /*recommended movies*/ }
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" align="center" gutterBottom>
          You might also like
        </Typography>
        {isRecommendationsFetching && (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        )}
        {!isRecommendationsFetching && (
          recommendations && recommendations?.results?.length
            ? <MovieList movies={recommendations} numberOfMovies={12} />
            : <Box><Typography variant="h6" align="center">Sorry, nothing was found.</Typography></Box>
        )}
      </Box>

      { /*movie trailer*/ }
      {data?.videos?.results?.length > 0 && (
        <Modal closeAfterTransition className={classes.modal} open={open} onClose={() => setOpen(false)}>
          <iframe
            autoPlay
            className={classes.video}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}?autoplay=1`}
            allow="autoplay"
            allowFullScreen
          />
        </Modal>
      )}
    </Grid>
  );
}

export default MovieInformation;
