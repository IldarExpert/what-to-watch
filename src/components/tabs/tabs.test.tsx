import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus} from '../../consts';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import React from 'react';
import Tabs from './tabs';

const navigator = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  user: {
    authorizationStatus: AuthStatus.Unknown,
  },
  data: {
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
});
const filmData = {
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
const comments = [{
  "id": 1,
  "user": {
    "id": 4,
    "name": "Kate Muir"
  },
  "rating": 8.9,
  "comment": "Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.",
  "date": "2019-05-08T14:13:56.569Z"
}, {
  "id": 1,
  "user": {
    "id": 4,
    "name": "Kate Muir"
  },
  "rating": 8.9,
  "comment": "Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.",
  "date": "2019-05-08T14:13:56.569Z"
}];

describe('Component: Tabs', () => {
  it('should render correctly when activeTab = 0', () => {
    let activeTab = 0;
    let {container} = render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Tabs activeTab={activeTab} filmData={filmData} comments={comments}/>
        </Router>
      </Provider>
    );

    expect(container.querySelector('.film-rating')).toBeInTheDocument();
  });

  it('should render correctly when activeTab = 1', () => {
    let activeTab = 1;
    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Tabs activeTab={activeTab} filmData={filmData} comments={comments}/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Run Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(/Released/i)).toBeInTheDocument();
  });

  it('should render correctly when activeTab = 2', () => {
    let activeTab = 2;
    let {container} = render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Tabs activeTab={activeTab} filmData={filmData} comments={comments}/>
        </Router>
      </Provider>
    );

    expect(container.querySelector('.review')).toBeInTheDocument();
  });
});
