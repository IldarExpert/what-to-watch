import {createReducer} from '@reduxjs/toolkit';
import {
  saveComments,
  saveFilmData,
  saveOneFilmData,
  savePromo, saveReviewError,
  saveSimilarFilmsData,
  updateLoadingStatus
} from '../actions';
import {DataReducerType} from '../../types/store';

const initialState: DataReducerType = {
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

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(saveFilmData, (state, action) => {
      state.filmList = action.payload;
    })
    .addCase(updateLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(saveOneFilmData, (state, action) => {
      state.film = action.payload;
    })
    .addCase(saveSimilarFilmsData, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(saveComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(savePromo, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(saveReviewError, (state, action) => {
      state.commentsError = action.payload;
    })
});
