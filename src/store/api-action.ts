import {ThunkActionResult} from '../types/actions';
import {ApiRoute} from '../consts';
import {FilmDataFromServer} from '../types/film-data-from-server';
import {Comment} from '../types/comments';
import {
  saveComments,
  saveFilmData,
  saveOneFilmData,
  savePromo,
  saveSimilarFilmsData,
  updateLoadingStatus
} from './actions';
import {convertKeyArr, convertKeyObj} from '../servises/convert-key-arr';

export const fetchFilmList = (): ThunkActionResult => {
  return async (dispatch, _getState, api) => {
    try {
      dispatch(updateLoadingStatus(true));
      const {data} = await api.get<FilmDataFromServer[]>(ApiRoute.Films);
      dispatch(saveFilmData(convertKeyArr(data)));
      dispatch(updateLoadingStatus(false));
    } catch (e) {
      console.log('error', e);
      dispatch(updateLoadingStatus(false));
    }
  }
}

export const fetchFilm = (id: string | undefined): ThunkActionResult => {
  return async (dispatch, _getState, api) => {
    try {
      dispatch(updateLoadingStatus(true));
      const {data} = await api.get<FilmDataFromServer>(ApiRoute.Films + '/' + id)
      dispatch(saveOneFilmData(convertKeyObj(data)))
      dispatch(updateLoadingStatus(false));
    } catch (e) {
      console.log('error', e);
      dispatch(updateLoadingStatus(false));
    }
  }
}

export const fetchSimilarFilms = (id: string | undefined): ThunkActionResult => {
  return async (dispatch, _getState, api) => {
    try {
      dispatch(updateLoadingStatus(true));
      const {data} = await api.get<FilmDataFromServer[]>(ApiRoute.Films + '/' + id + '/similar');
      dispatch(saveSimilarFilmsData(convertKeyArr(data)));
      dispatch(updateLoadingStatus(false));
    } catch (e) {
      console.log('error', e);
      dispatch(updateLoadingStatus(false));
    }
  }
}

export const fetchReviews = (id: string | undefined | number): ThunkActionResult => {
  return async (dispatch, _getState, api) => {
    try {
      dispatch(updateLoadingStatus(true));
      const {data} = await api.get<Comment[]>(ApiRoute.Comments + '/' + id);
      dispatch(saveComments(data));
      dispatch(updateLoadingStatus(false));
    } catch (e) {
      console.log('error', e);
      dispatch(updateLoadingStatus(false));
    }
  }
}

export const fetchPromo = (): ThunkActionResult => {
  return async (dispatch, _getState, api) => {
    try {
      dispatch(updateLoadingStatus(true));
      const {data} = await api.get<FilmDataFromServer>(ApiRoute.Promo);
      dispatch(savePromo(convertKeyObj(data)));
      dispatch(updateLoadingStatus(false));
    } catch (e) {
      console.log('error', e);
      dispatch(updateLoadingStatus(false));
    }
  }
}
