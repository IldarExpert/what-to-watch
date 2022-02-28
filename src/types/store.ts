import {RootState} from '../store/root-reducer';
import {FilmData} from './film-data-from-server';
import {Comment} from './comments';
import {AuthStatus} from '../consts';
import {UserInfo} from './user-info';

export type DataReducerType = {
  filmList: FilmData[],
  film: FilmData,
  isLoading: boolean,
  similarFilms: FilmData[],
  comments: Comment[],
  commentsError: string | null,
  promoFilm: FilmData,
}

export type UserReducerType = {
  authorizationStatus: AuthStatus,
  userInfo: UserInfo,
  authErrorMessage: string,
  myList: FilmData[],
}

export type State = RootState;
