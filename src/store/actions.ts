import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/actions';
import {FilmData} from '../types/film-data-from-server';
import {Comment} from '../types/comments';
import {AuthStatus} from '../consts';


export const saveFilmData = createAction<FilmData[]>(ActionType.saveFilmData)

export const updateLoadingStatus = createAction<boolean>(ActionType.updateLoadingStatus);

export const saveOneFilmData = createAction<FilmData>(ActionType.saveOneFilmData);

export const saveSimilarFilmsData = createAction<FilmData[]>(ActionType.saveSimilarFilmsData);

export const saveComments = createAction<Comment[]>(ActionType.saveComments);

export const savePromo = createAction<FilmData>(ActionType.savePromo);


export const updateAuthStatus = createAction<AuthStatus>(ActionType.updateAuthStatus);
