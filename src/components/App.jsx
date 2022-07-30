import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Routes as Switch, Route } from 'react-router-dom';

import { Actors, MovieInformation, Movies, Navbar, Profile } from '.';

import useAlan from './Alan/Alan';
import useStyles from './styles';

function App() {
  const classes = useStyles(); //useStyles.js hook

  const alanBtnContainer = useRef();
  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}> { /*main div contains the main part of the application*/ }
        <div className={classes.toolbar} />
        <Switch> { /*a <Switch> looks through its children <Route>s and renders the first one that matches the current URL*/ }
          <Route exact path="/movie/:id" element={<MovieInformation />} /> { /*notice: /:id <=> /<number>*/ }
          <Route exact path="/actors/:id" element={<Actors />} />
          <Route exact path="/*" element={<Movies />} /> { /*notice: it's smart to use 'exact'*/ }
          <Route exact path="/approved" element={<Movies />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Switch>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
}

export default App;
