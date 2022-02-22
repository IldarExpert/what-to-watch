import {RootState} from '../store/root-reducer';
import {FilmData} from './film-data-from-server';
import {Comment} from './comments';

export type dataReducerType = {
  filmList: FilmData[],
  film: FilmData,
  isLoading: boolean,
  similarFilms: FilmData[],
  comments: Comment[],
  promoFilm: FilmData,
}

export type State = RootState;
