import {configureMockStore} from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import React from 'react';
import {Provider} from 'react-redux';
import {Route, Router, Routes} from 'react-router-dom';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {AppRoute, AuthStatus} from '../../consts';
import AddReview from '../../pages/add-review/add-review';
import Main from '../../pages/main/main';
import MoviePage from '../../pages/movie-page/movie-page';
import MyList from '../../pages/my-list/my-list';
import Player from '../../pages/player/player';
import SignIn from '../../pages/sign-in/sign-in';
import {createAPI} from '../../servises/api';
import {State} from '../../types/store';
import PageNotFound from '../page-not-found/page-not-found';
import PrivateRoute from '../private-route/private-route';

const navigator = createMemoryHistory();
const api = createAPI(jest.fn());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State,
  Action,
  ThunkDispatch<State, typeof api, Action>>(middlewares);
const store = mockStore({
  user: {
    authorizationStatus: AuthStatus.Auth,
    userInfo: {
      "id": 1,
      "email": "Oliver.conner@gmail.com",
      "name": "Oliver.conner",
      "avatarUrl": "img/1.png",
      "token": "T2xpdmVyLmNvbm5lckBnbWFpbC5jb20="
    },
    authErrorMessage: '',
    myList: [{
      "id": 1,
      "name": "The Grand Budapest Hotel",
      "posterImage": "img/the-grand-budapest-hotel-poster.jpg",
      "previewImage": "img/the-grand-budapest-hotel.jpg",
      "backgroundImage": "img/the-grand-budapest-hotel-bg.jpg",
      "backgroundColor": "#ffffff",
      "videoLink": "/",
      "previewVideoLink": "/",
      "description": "In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.",
      "rating": 8.9,
      "scoresCount": 240,
      "director": "Wes Anderson",
      "starring": ["Bill Murray", "Edward Norton", "Jude Law", "Willem Dafoe", "Saoirse Ronan"],
      "runTime": 99,
      "genre": "Comedy",
      "released": 2014,
      "isFavorite": false
    }],
  },
  data: {
    filmList: [{
      "id": 1,
      "name": "The Grand Budapest Hotel",
      "posterImage": "img/the-grand-budapest-hotel-poster.jpg",
      "previewImage": "img/the-grand-budapest-hotel.jpg",
      "backgroundImage": "img/the-grand-budapest-hotel-bg.jpg",
      "backgroundColor": "#ffffff",
      "videoLink": "/",
      "previewVideoLink": "/",
      "description": "In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.",
      "rating": 8.9,
      "scoresCount": 240,
      "director": "Wes Anderson",
      "starring": ["Bill Murray", "Edward Norton", "Jude Law", "Willem Dafoe", "Saoirse Ronan"],
      "runTime": 99,
      "genre": "Comedy",
      "released": 2014,
      "isFavorite": false
    }],
    film: {
      "id": 1,
      "name": "The Grand Budapest Hotel",
      "posterImage": "img/the-grand-budapest-hotel-poster.jpg",
      "previewImage": "img/the-grand-budapest-hotel.jpg",
      "backgroundImage": "img/the-grand-budapest-hotel-bg.jpg",
      "backgroundColor": "#ffffff",
      "videoLink": "/",
      "previewVideoLink": "/",
      "description": "In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.",
      "rating": 8.9,
      "scoresCount": 240,
      "director": "Wes Anderson",
      "starring": ["Bill Murray", "Edward Norton", "Jude Law", "Willem Dafoe", "Saoirse Ronan"],
      "runTime": 99,
      "genre": "Comedy",
      "released": 2014,
      "isFavorite": false
    },
    isLoading: false,
    similarFilms: [{
      "id": 1,
      "name": "The Grand Budapest Hotel",
      "posterImage": "img/the-grand-budapest-hotel-poster.jpg",
      "previewImage": "img/the-grand-budapest-hotel.jpg",
      "backgroundImage": "img/the-grand-budapest-hotel-bg.jpg",
      "backgroundColor": "#ffffff",
      "videoLink": "/",
      "previewVideoLink": "/",
      "description": "In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.",
      "rating": 8.9,
      "scoresCount": 240,
      "director": "Wes Anderson",
      "starring": ["Bill Murray", "Edward Norton", "Jude Law", "Willem Dafoe", "Saoirse Ronan"],
      "runTime": 99,
      "genre": "Comedy",
      "released": 2014,
      "isFavorite": false
    }],
    comments: [{
      "id": 1,
      "user": {
        "id": 4,
        "name": "Kate Muir"
      },
      "rating": 8.9,
      "comment": "Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.",
      "date": "2019-05-08T14:13:56.569Z"
    }],
    commentsError: null,
    promoFilm: {
      "id": 1,
      "name": "The Grand Budapest Hotel",
      "posterImage": "img/the-grand-budapest-hotel-poster.jpg",
      "previewImage": "img/the-grand-budapest-hotel.jpg",
      "backgroundImage": "img/the-grand-budapest-hotel-bg.jpg",
      "backgroundColor": "#ffffff",
      "videoLink": "/",
      "previewVideoLink": "/",
      "description": "In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.",
      "rating": 8.9,
      "scoresCount": 240,
      "director": "Wes Anderson",
      "starring": ["Bill Murray", "Edward Norton", "Jude Law", "Willem Dafoe", "Saoirse Ronan"],
      "runTime": 99,
      "genre": "Comedy",
      "released": 2014,
      "isFavorite": false
    },
  }
});

const fakeApp = (
  <Provider store={store}>
    <Router navigator={navigator} location={navigator.location}>
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
    </Router>
  </Provider>
);

describe('Application routing', () => {
  it('should render Main when navigate to AppRoute.Main', () => {
    navigator.push(AppRoute.Main);
    render(<Provider store={store}>
      <Router navigator={navigator} location={navigator.location}>
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
      </Router>
    </Provider>);

    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render SignIn when navigate to AppRoute.SignIn', () => {
    navigator.push(AppRoute.SignIn);
    render(<Provider store={store}>
      <Router navigator={navigator} location={navigator.location}>
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
      </Router>
    </Provider>);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should render MoviePage when navigate to AppRoute.MoviePage', () => {
    navigator.push(AppRoute.MoviePage);
    render(<Provider store={store}>
      <Router navigator={navigator} location={navigator.location}>
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
      </Router>
    </Provider>);

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });

  it('should render MyList when navigate to AppRoute.MyList and user is auth', () => {
    navigator.push(AppRoute.MyList);
    render(<Provider store={store}>
      <Router navigator={navigator} location={navigator.location}>
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
      </Router>
    </Provider>);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render AddReview when navigate to AppRoute.AddReview and user is auth', () => {
    navigator.push(AppRoute.AddReview);
    render(<Provider store={store}>
      <Router navigator={navigator} location={navigator.location}>
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
      </Router>
    </Provider>);

    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Rating/i)).toHaveLength(10);
  });

  it('should render Player when navigate to AppRoute.Player', () => {
    navigator.push(AppRoute.Player)
    render(<Provider store={store}>
      <Router navigator={navigator} location={navigator.location}>
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
      </Router>
    </Provider>);

    expect(screen.getByText(/exit/i)).toBeInTheDocument();
    expect(screen.queryByTestId('videoPlayer')).toBeInTheDocument();
  });

  it('should render PageNotFound when navigate to non execute route', () => {
    navigator.push('/non execute route')
    render(<Provider store={store}>
      <Router navigator={navigator} location={navigator.location}>
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
      </Router>
    </Provider>);

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
