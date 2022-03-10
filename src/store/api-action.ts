import {ThunkActionResult} from '../types/actions';
import {ApiRoute, AuthStatus} from '../consts';
import {FilmDataFromServer} from '../types/film-data-from-server';
import {Comment} from '../types/comments';
import {
  saveAuthErrorMessage,
  saveComments,
  saveFilmData,
  saveOneFilmData,
  savePromo, saveReviewError,
  saveSimilarFilmsData, saveUserData,
  updateAuthStatus,
  updateLoadingStatus, updateMyList
} from './actions';
import {convertKeyArr, convertKeyObj} from '../servises/convert-key-arr';
import {UserInfoFromServer} from '../types/user-info';
import {removeToken, setToken} from '../servises/token';

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

export const fetchFilm = (id: string | undefined | number): ThunkActionResult => {
  return async (dispatch, _getState, api) => {
    try {
      dispatch(updateLoadingStatus(true));
      const {data} = await api.get<FilmDataFromServer>(ApiRoute.Films + '/' + id)
      dispatch(saveOneFilmData(convertKeyObj(data)))
    } catch (e) {
      console.log('error', e);
    } finally {
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

export const checkAuthStatus = (): ThunkActionResult => {
  return async (dispatch, _getState, api) => {
    try {
      dispatch(updateLoadingStatus(true));
      const response = await api.get<string>(ApiRoute.Login);
      if (response.status === 200) {
        dispatch(updateAuthStatus(AuthStatus.Auth));
        dispatch(saveUserData(convertKeyObj(response.data)))
      }
      dispatch(updateLoadingStatus(false));
    } catch (e) {
      console.log('error', e);
      dispatch(updateLoadingStatus(false));
    }
  }
}

export const requireAuthorization = (email: string, password: string): ThunkActionResult => {
  return async (dispatch, _getState, api) => {
    try {
      dispatch(updateLoadingStatus(true));
      const {data} = await api.post<UserInfoFromServer>(ApiRoute.Login, {email, password});
      setToken(data.token);
      dispatch(saveUserData(convertKeyObj(data)))
      dispatch(updateAuthStatus(AuthStatus.Auth));
      dispatch(saveAuthErrorMessage(''))
    } catch (e: any) {
      if (e.response?.status === 400) {
        dispatch(saveAuthErrorMessage(e.response.data.error))
      }

    } finally {
      dispatch(updateLoadingStatus(false));
    }
  }
}

export const requireLogOut = (): ThunkActionResult => {
  return async (dispatch, _getState, api) => {
    try {
      dispatch(updateLoadingStatus(true));
      await api.delete(ApiRoute.Logout);
      removeToken();
      dispatch(updateAuthStatus(AuthStatus.NoAuth));
      dispatch(updateLoadingStatus(false));
    } catch (e) {
      console.log('error', e);
      dispatch(updateLoadingStatus(false));
    }
  }
}

export const fetchMyList = (): ThunkActionResult => {
  return async (dispatch, _getState, api) => {
    try {
      dispatch(updateLoadingStatus(true));
      const {data} = await api.get<FilmDataFromServer[]>(ApiRoute.MyList)
      dispatch(updateMyList(convertKeyArr(data)));
    } catch (e) {
      console.log('error', e);
    } finally {
      dispatch(updateLoadingStatus(false));
    }
  }
}

export const postMyList = (id: number | string, inMyList: boolean, promoId: number | string): ThunkActionResult => {
  const inMyListSelector = inMyList ? 0 : 1;

  return async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post<FilmDataFromServer>(ApiRoute.MyList + '/' + id + '/' + inMyListSelector);
      dispatch(saveOneFilmData(convertKeyObj(data)));
      if (promoId === id) {
        dispatch(savePromo(convertKeyObj(data)))
      }
    } catch (e) {
      console.log('error', e);
    }
  }
}

export const postReview = (id: string | number, comment : {rating: number, comment: string}): ThunkActionResult => {
  return async (dispatch, _getState, api) => {
    try {
      await api.post(ApiRoute.Comments + '/' + id, comment);
      dispatch(saveReviewError(''));
    } catch (e: any) {
      dispatch(saveReviewError(e.response?.data?.error))
    }
  }
}
