import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  moviesContainer: {
    display: 'flex',
    flexWrap: 'wrap', //we can wrap our movies into multiple lines
    justifyContent: 'space-between',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));
