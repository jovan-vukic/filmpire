import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex', //div items are arranged side by side
    height: '100%',
  },
  toolbar: {
    height: '70px',
  },
  content: {
    flexGrow: 1, //notice: 'flex-grow' (.css) => 'flexGrow' (.js)
    padding: '2em', //generates space around an element's content
  },
})); //notice: { return {...}; } <=> ({...})
