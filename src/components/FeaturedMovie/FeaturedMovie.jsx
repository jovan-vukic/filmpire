import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

function FeaturedMovie({ movie }) {
  const classes = useStyles();

  if (!movie) return null;
  return (
    <Box component={Link} to={`/movie/${movie?.id}`} className={classes.featuredCardContainer}>
      <Card className={classes.featuredCard} classes={{ root: classes.cardRoot }}>
        <CardMedia
          media="picture"
          alt={movie?.title}
          image={movie?.backdrop_path ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}` : 'https://www.fillmurray.com/200/300'}
          title={movie?.title}
          className={classes.cardMedia}
        />
        <Box padding="20px">
          <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
            <Typography variant="h5" gutterBottom>{movie?.title}</Typography>
            <Typography variant="body2">{movie?.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default FeaturedMovie;
