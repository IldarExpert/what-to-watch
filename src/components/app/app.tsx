import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import {AppRoute} from '../../consts';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MoviePage from '../../pages/movie-page/movie-page';
import MyList from '../../pages/my-list/my-list';
import PageNotFound from '../page-not-found/page-not-found';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main/>}/>
        <Route path={AppRoute.SignIn} element={<SignIn/>}/>
        <Route path={AppRoute.MoviePage} element={<MoviePage/>}/>
        <Route path={AppRoute.MyList} element={
          <PrivateRoute>
            <MyList/>
          </PrivateRoute>
        }/>
        <Route path={AppRoute.AddReview} element={
          <PrivateRoute>
            <AddReview/>
          </PrivateRoute>
        }/>
        <Route path={AppRoute.Player} element={<Player/>}/>
        <Route path={'*'} element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
