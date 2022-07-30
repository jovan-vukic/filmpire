import { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ColorModeContext } from '../../utils/ToggleColorMode';
import { fetchToken } from '../../utils';
import { selectGenreOrCategory, searchMovie } from '../../features/currentGenreOrCategory';

function useAlan() {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: ({ command, mode, genreOrCategory, genres, query }) => {
        if (command === 'changeMode') {
          if (mode === 'light') setMode('light');
          else setMode('dark');
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'logout') {
          localStorage.clear();
          window.location.href = '/';
        } else if (command === 'chooseGenreOrCategory') {
          const foundGenre = genres.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());

          if (foundGenre) { //only for genres
            history('/');
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else if (genreOrCategory) {
            //categories: 'popular', 'top rated', 'upcoming'
            const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;

            history('/');
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === 'search') {
          dispatch(searchMovie(query));
        } else if (command === 'goback') {
          history(-1);
        }
      },
    });
  }, []);
}

export default useAlan;
