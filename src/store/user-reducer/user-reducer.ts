import {createReducer} from '@reduxjs/toolkit';
import {AuthStatus} from '../../consts';
import {UserReducerType} from '../../types/store';
import {saveAuthErrorMessage, saveUserData, updateAuthStatus, updateMyList} from '../actions';

export const initialState: UserReducerType = {
  authorizationStatus: AuthStatus.Unknown,
  userInfo: {
    "id": 1,
    "email": "Oliver.conner@gmail.com",
    "name": "Oliver.conner",
    "avatarUrl": "img/1.png",
    "token": "T2xpdmVyLmNvbm5lckBnbWFpbC5jb20="
  },
  authErrorMessage: '',
  myList: [{
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
}

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(saveUserData, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(saveAuthErrorMessage, (state, action) => {
      state.authErrorMessage = action.payload;
    })
    .addCase(updateMyList, (state, action) => {
      state.myList = action.payload;
    })

});
