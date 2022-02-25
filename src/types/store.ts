import {RootState} from '../store/root-reducer';
import {FilmData} from './film-data-from-server';
import {Comment} from './comments';
import {AuthStatus} from '../consts';

export type DataReducerType = {
  filmList: FilmData[],
  film: FilmData,
  isLoading: boolean,
  similarFilms: FilmData[],
  comments: Comment[],
  promoFilm: FilmData,
}

export type UserReducerType = {
  authorizationStatus: AuthStatus,
}

export type State = RootState;
