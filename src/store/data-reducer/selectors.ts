import {State} from '../../types/store';

export const getIsLoading = (state: State) => state.data.isLoading;
export const getFilmList = (state: State) => state.data.filmList;
export const getFilm = (state: State) => state.data.film;
export const getSimilarFilms = (state: State) => state.data.similarFilms;
export const getComments = (state:State) => state.data.comments;
export const getPromoFilm = (state: State) => state.data.promoFilm;
