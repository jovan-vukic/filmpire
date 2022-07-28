import React from 'react';
import { Typography, Button } from '@mui/material';

import useStyles from './styles';

function Pagination({ currentPage, setPage, totalPages }) {
  const classes = useStyles();

  const handlePrev = () => {
    setPage((prevPage) => prevPage - 1);
  };
  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (totalPages === 0) return null;
  return (
    <div className={classes.container}>
      <Button
        disabled={currentPage === 1}
        onClick={handlePrev}
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
      >
        Prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>{currentPage}</Typography>
      <Button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className={classes.button}
        variant="contained"
        color="primary"
        type="button"
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
