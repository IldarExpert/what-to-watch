import {initialState, userReducer} from './user-reducer';
import {AuthStatus} from '../../consts';
import {saveAuthErrorMessage, saveUserData, updateAuthStatus, updateMyList} from '../actions';
import {FilmData} from '../../types/film-data-from-server';
import {UserInfo} from '../../types/user-info';

describe('Reducer: userReducer', () => {
  const state = {
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

  it('should return initialState without add parameters', () => {
    expect(userReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update auth status', () => {

    expect(userReducer(state, updateAuthStatus(AuthStatus.Auth)))
      .toEqual({...state, authorizationStatus: AuthStatus.Auth});

    expect(userReducer(state, updateAuthStatus(AuthStatus.NoAuth)))
      .toEqual({...state, authorizationStatus: AuthStatus.NoAuth});
  });

  it('should save user data', () => {
    const userInfo: UserInfo = {
      "id": 5,
      "email": "Oliver.conner@gmail.comOliver.conner@gmail.comOliver.conner@gmail.com",
      "name": "Oliver.connerOliver.conner",
      "avatarUrl": "img/1.pngimg/1.pngimg/1.png",
      "token": "T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=T2xpdmVyLmNvbm5lckBnbWFpbC5jb20="
    }

    expect(userReducer(state, saveUserData(userInfo)))
      .toEqual({...state, userInfo});
  });

  it('should save auth error message', () => {
    const err: string = 'ErrorErrorError';

    expect(userReducer(state, saveAuthErrorMessage(err)))
      .toEqual({...state, authErrorMessage: err});
  });

  it('should update my list', () => {
    const filmDataArr: FilmData[] = [{
      "id": 2,
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
      {
        "id": 3,
        "name": "The Grand Budapest Hotel",
        "posterImage": "img/the-grand-budapest-hotel-poster.jpg",
        "previewImage": "img/the-grand-budapest-hotel.jpg",
        "backgroundImage": "img/the-grand-budapest-hotel-bg.jpg",
        "backgroundColor": "#ffffff",
        "videoLink": "/",
        "previewVideoLink": "/",
        "description": "In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.",
        "rating": 8.9,
        "scoresCount": 290,
        "director": "Wes Anderson",
        "starring": ["Bill Murray", "Edward Norton", "Jude Law", "Willem Dafoe", "Saoirse Ronan"],
        "runTime": 99,
        "genre": "Comedy",
        "released": 2016,
        "isFavorite": true
      }];

    expect(userReducer(state, updateMyList(filmDataArr)))
      .toEqual({...state, myList: filmDataArr});
  });
})
;
