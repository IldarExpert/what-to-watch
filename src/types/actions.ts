import {Action} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from './store';

export enum ActionType {
  saveFilmData = 'data/save_film_data',
  updateLoadingStatus = 'data/update_loading_status',
  saveOneFilmData = 'data/save_one_film_data',
  saveSimilarFilmsData = 'data/save_similar_films_data',
  saveComments = 'data/save_comments',
  saveReviewError = 'data/save_review_error',
  savePromo = 'data/save_promo',
  updateAuthStatus = 'user/update_auth_status',
  saveUserData = 'user/save_user_data',
  saveAuthErrorMassage = 'user/save_auth_error_massage',
  updateMyList = 'user/update_my_list',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
