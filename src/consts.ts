export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/favorites',
  MoviePage = '/film/:id',
  OneMoviePage = '/film',
  AddReview = '/films/:id/review',
  Films = '/films',
  PlayerShow = '/player',
  Player = '/player/:id',
}

export enum AuthStatus {
  Auth= 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ApiRoute = {
  Films: '/films',
  Comments: '/comments',
  Promo: '/promo',
  Login: '/login',
  Logout: '/logout',
  MyList: '/favorite',
}

export const FILM_PER_PAGE = 8;

export const GENRES_PER_PAGE = 9
