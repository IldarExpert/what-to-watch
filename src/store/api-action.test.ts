import {createAPI} from '../servises/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../types/store';
import {Action} from 'redux';
import {ApiRoute, AuthStatus} from '../consts';
import {
  checkAuthStatus,
  fetchFilm,
  fetchFilmList, fetchMyList,
  fetchPromo,
  fetchReviews,
  fetchSimilarFilms, postMyList, postReview, requireAuthorization, requireLogOut
} from './api-action';
import {
  saveAuthErrorMessage,
  saveComments,
  saveFilmData,
  saveOneFilmData, savePromo, saveReviewError,
  saveSimilarFilmsData,
  saveUserData,
  updateAuthStatus,
  updateLoadingStatus, updateMyList
} from './actions';
import {FilmData} from '../types/film-data-from-server';
import {UserInfo} from '../types/user-info';
import {Comment} from '../types/comments';
import {convertKeyArr, convertKeyObj} from '../servises/convert-key-arr';

describe('Async actions', () => {
  const api = createAPI(jest.fn());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State,
    Action,
    ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should dispatch saveFilmData when GET /films', async () => {
    const store = mockStore();
    const filmDataFromServer: FilmData[] = [{
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
    }]

    mockAPI
      .onGet(ApiRoute.Films)
      .reply(200, filmDataFromServer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFilmList());

    expect(store.getActions()).toEqual([
      updateLoadingStatus(true),
      saveFilmData(filmDataFromServer),
      updateLoadingStatus(false),
    ])
  });

  it('should dispatch saveOneFilmData when GET /films/:id', async () => {
    const store = mockStore();
    const id = 10;
    const oneFilmDataFromServer: FilmData = {
      "id": id,
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
    }

    mockAPI
      .onGet(ApiRoute.Films + '/' + id)
      .reply(200, oneFilmDataFromServer);

    await store.dispatch(fetchFilm(id));

    expect(store.getActions()).toEqual([
      updateLoadingStatus(true),
      saveOneFilmData(oneFilmDataFromServer),
      updateLoadingStatus(false),
    ]);
  });

  it('should dispatch saveSimilarFilmsData when GET /films/:id/similar', async () => {
    const store = mockStore();
    const id = '10';
    const similarFilmDataFromServer: FilmData[] = [{
      "id": 10,
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
    }]

    mockAPI
      .onGet(ApiRoute.Films + '/' + id + '/similar')
      .reply(200, similarFilmDataFromServer);

    await store.dispatch(fetchSimilarFilms(id));

    expect(store.getActions()).toEqual([
      updateLoadingStatus(true),
      saveSimilarFilmsData(similarFilmDataFromServer),
      updateLoadingStatus(false),
    ])
  });

  it('should dispatch saveComments when GET  "ApiRoute.Comments/id"', async () => {
    const store = mockStore();
    const id = 10;
    const comments: Comment[] = [{
      "id": 10,
      "user": {
        "id": 4,
        "name": "Kate Muir"
      },
      "rating": 8.9,
      "comment": "Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.",
      "date": "2019-05-08T14:13:56.569Z"
    }];

    mockAPI
      .onGet(ApiRoute.Comments + '/' + id)
      .reply(200, comments);

    await store.dispatch(fetchReviews(id));

    expect(store.getActions()).toEqual([
      updateLoadingStatus(true),
      saveComments(comments),
      updateLoadingStatus(false),
    ])
  });

  it('should dispatch savePromo when GET "ApiRoute.Promo"', async () => {
    const store = mockStore();
    const promo = {
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
    };

    mockAPI
      .onGet(ApiRoute.Promo)
      .reply(200, promo);

    await store.dispatch(fetchPromo());

    expect(store.getActions()).toEqual([
      updateLoadingStatus(true),
      savePromo(promo),
      updateLoadingStatus(false),
    ]);
  });

  it('should update auth status to "auth" and save user info when server return 200', async () => {
    const store = mockStore();

    const userInfo: UserInfo = {
      "id": 1,
      "email": 'string',
      "name": 'string',
      "avatarUrl": 'string',
      "token": 'string'
    }

    mockAPI
      .onGet(ApiRoute.Login)
      .reply(200, userInfo);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthStatus());

    expect(store.getActions()).toEqual([
      updateLoadingStatus(true),
      updateAuthStatus(AuthStatus.Auth),
      saveUserData(userInfo),
      updateLoadingStatus(false),
    ])

  });

  it('should save token, save user data, update auth status to "auth" when POST "ApiRoute.Login"', async () => {
    const store = mockStore();
    const email = 'test@test.ru';
    const password = '123456';
    const fakeUser = {email, password};
    const userInfo: UserInfo = {
      "id": 1,
      "email": "Oliver.conner@gmail.com",
      "name": "Oliver.conner",
      "avatarUrl": "img/1.png",
      "token": "T2xpdmVyLmNvbm5lckBnbWFpbC5jb20="
    }

    Storage.prototype.setItem = jest.fn();

    mockAPI
      .onPost(ApiRoute.Login, fakeUser)
      .reply(200, userInfo)

    await store.dispatch(requireAuthorization(email, password));

    expect(store.getActions()).toEqual([
      updateLoadingStatus(true),
      saveUserData(userInfo),
      updateAuthStatus(AuthStatus.Auth),
      saveAuthErrorMessage(''),
      updateLoadingStatus(false),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('what-to-watch', "T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=");
  });

  it('should remove token and dispatch updateLoadingStatus to "AuthStatus.NoAuth"', async () => {
    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    mockAPI
      .onDelete(ApiRoute.Logout)
      .reply(204);

    await store.dispatch(requireLogOut());

    expect(store.getActions()).toEqual([
      updateLoadingStatus(true),
      updateAuthStatus(AuthStatus.NoAuth),
      updateLoadingStatus(false),
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('what-to-watch');
  });

  it('should dispatch updateMyList when GET "ApiRoute.MyList"', async () => {
    const store = mockStore();
    const myList: FilmData[] = [{
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
    }];

    mockAPI
      .onGet(ApiRoute.MyList)
      .reply(200, myList);

    await store.dispatch(fetchMyList());

    expect(store.getActions()).toEqual([
      updateLoadingStatus(true),
      updateMyList(myList),
      updateLoadingStatus(false),
    ]);

  });

  it('should dispatch saveOneFilmData and savePromo when promoId === id dispatch and POST "ApiRoute.MyList + / + id + / + inMyListSelector" ', async () => {
    const store = mockStore();
    const id = 10;
    const promoId = 10;
    let inMyList = Math.random() > 0.5;
    const inMyListSelector = inMyList ? 0 : 1;
    const oneFilmData: FilmData = {
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
    }

    mockAPI
      .onPost(ApiRoute.MyList + '/' + id + '/' + inMyListSelector)
      .reply(200, oneFilmData);

    await store.dispatch(postMyList(id, inMyList, promoId));

    expect(store.getActions()).toEqual([
      saveOneFilmData(oneFilmData),
      savePromo(oneFilmData),
    ]);
  });

  it('should dispatch saveOneFilmData when promoId !== id when POST "ApiRoute.MyList + / + id + / + inMyListSelector" ', async () => {
    const store = mockStore();
    const id = 11;
    const promoId = 10;
    let inMyList = Math.random() > 0.5;
    const inMyListSelector = inMyList ? 0 : 1;
    const oneFilmData: FilmData = {
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
    }

    mockAPI
      .onPost(ApiRoute.MyList + '/' + id + '/' + inMyListSelector)
      .reply(200, oneFilmData);

    await store.dispatch(postMyList(id, inMyList, promoId));

    expect(store.getActions()).toEqual([
      saveOneFilmData(oneFilmData),
    ]);
  });

  it('should dispatch saveReviewError("") when server return status 200 after POST "ApiRoute.Comments + / + id"', async () => {
    const store = mockStore();
    const id = 10;
    const comment: {rating: number, comment: string} = {
      rating: 7,
      comment: 'string',
    }

    mockAPI
      .onPost(ApiRoute.Comments + '/' + id, comment)
      .reply(200)

    await store.dispatch(postReview(id, comment))

    expect(store.getActions()).toEqual([
      saveReviewError(''),
    ])
  });

  it('should dispatch saveReviewError("errorText") when server return status 400 after POST "ApiRoute.Comments + / + id"', async () => {
    const store = mockStore();
    const id = 10;
    const comment: {rating: number, comment: string} = {
      rating: 7,
      comment: 'string',
    }
    const response = {
      data: {
        error: 'error'
      }
    }

    mockAPI
      .onPost(ApiRoute.Comments + '/' + id, comment)
      .reply(400, response)

    try {
      await store.dispatch(postReview(id, comment));
    } catch (e) {
      expect(store.getActions()).toEqual([
        saveReviewError(response.data.error)
      ])
    }
  });
});
