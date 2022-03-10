import {configureMockStore} from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import SimilarFilms from './similar-films';

const navigator = createMemoryHistory();
const similarFilms = [{
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
const mockStore = configureMockStore();
const store = mockStore({
  data: {
    isLoading: false,
  }
});

describe('Component: SimilarFilms', () => {
  it('should render correctly', async () => {
    const {container} = render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <SimilarFilms similarFilms={similarFilms}/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(container.querySelector('.catalog__films-list')).toBeInTheDocument();
  });
});
