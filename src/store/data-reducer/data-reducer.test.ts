import {dataReducer, initialState} from './data-reducer';
import {
  saveComments,
  saveFilmData,
  saveOneFilmData,
  savePromo, saveReviewError,
  saveSimilarFilmsData,
  updateLoadingStatus
} from '../actions';

describe('Reducer: dataReducer', () => {
  const state = {
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
  };

  const filmDataArr = [
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
      "scoresCount": 640,
      "director": "Wes Anderson",
      "starring": ["Bill Murray", "Edward Norton", "Jude Law", "Willem Dafoe", "Saoirse Ronan"],
      "runTime": 99,
      "genre": "Comedy",
      "released": 2014,
      "isFavorite": false
    },
    {
      "id": 8,
      "name": "The Grand Budapest Hotel",
      "posterImage": "img/the-grand-budapest-hotel-poster.jpg",
      "previewImage": "img/the-grand-budapest-hotel.jpg",
      "backgroundImage": "img/the-grand-budapest-hotel-bg.jpg",
      "backgroundColor": "#ffffff",
      "videoLink": "/",
      "previewVideoLink": "/",
      "description": "In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.",
      "rating": 9.9,
      "scoresCount": 240,
      "director": "Wes Anderson",
      "starring": ["Bill Murraydfdf", "Edward Norton", "Jude Law", "Willem Dafoe", "Saoirse Ronan"],
      "runTime": 99,
      "genre": "Comedy",
      "released": 2015,
      "isFavorite": true
    }];

  const oneFilmData = {
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
    "scoresCount": 640,
    "director": "Wes Anderson",
    "starring": ["Bill Murray", "Edward Norton", "Jude Law", "Willem Dafoe", "Saoirse Ronan"],
    "runTime": 99,
    "genre": "Comedy",
    "released": 2014,
    "isFavorite": false
  };

  const commentsArr = [
    {
      "id": 1,
      "user": {
        "id": 4,
        "name": "Kate Muir"
      },
      "rating": 8.9,
      "comment": "Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.",
      "date": "2019-05-08T14:13:56.569Z"
    },
    {
      "id": 3,
      "user": {
        "id": 7,
        "name": "Kate Muir"
      },
      "rating": 9.9,
      "comment": "Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.",
      "date": "2019-05-08T14:13:56.569Z"
    }
  ];

  it('should return initialState without add parameters', () => {
    expect(dataReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should save film data', () => {
    expect(dataReducer(state, saveFilmData(filmDataArr)))
      .toEqual({...state, filmList: filmDataArr})
  });

  it('should update loading status', () => {
    expect(dataReducer(state, updateLoadingStatus(true)))
      .toEqual({...state, isLoading: true})
  });

  it('should save one film data', () => {
    expect(dataReducer(state, saveOneFilmData(oneFilmData)))
      .toEqual({...state, film: oneFilmData})
  });

  it('should save similar films data', () => {
    expect(dataReducer(state, saveSimilarFilmsData(filmDataArr)))
      .toEqual({...state, similarFilms: filmDataArr})
  });

  it('should save comments', () => {
    expect(dataReducer(state, saveComments(commentsArr)))
      .toEqual({...state, comments: commentsArr})
  });

  it('should save promo', () => {
    expect(dataReducer(state, savePromo(oneFilmData)))
      .toEqual({...state, promoFilm: oneFilmData})
  });

  it('should save review error', () => {
    const someReviewError = 'reviewError reviewError'

    expect(dataReducer(state, saveReviewError(someReviewError)))
      .toEqual({...state, commentsError: someReviewError})
  });
});
