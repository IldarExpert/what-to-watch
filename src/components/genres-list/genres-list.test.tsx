import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import React from 'react';
import GenresList from './genres-list';
import userEvent from '@testing-library/user-event/dist';

const navigator = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({});

const genresList = [
  'Adventure',
  'drama',
  'crime',
  'fantasy',
  'action',
  'comedy',
  'thriller',
];
const handleFilterGenresClick = jest.fn();

describe('Component: GenresList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <GenresList genresList={genresList} handleFilterGenresClick={handleFilterGenresClick}/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    genresList.forEach((el) => {
      expect(screen.getByText(new RegExp(el, 'i'))).toBeInTheDocument();
    });
    userEvent.click(screen.getByText(genresList[1]));
    expect(screen.getByText(new RegExp(genresList[1], 'i')).parentNode).toHaveClass('catalog__genres-item--active');
    expect(handleFilterGenresClick).nthCalledWith(1, genresList[1]);

    userEvent.click(screen.getByText(genresList[2]));
    expect(screen.getByText(new RegExp(genresList[2], 'i')).parentNode).toHaveClass('catalog__genres-item--active');
    expect(handleFilterGenresClick).nthCalledWith(2, genresList[2]);

    userEvent.click(screen.getByText(genresList[3]));
    expect(screen.getByText(new RegExp(genresList[3], 'i')).parentNode).toHaveClass('catalog__genres-item--active');
    expect(handleFilterGenresClick).nthCalledWith(3, genresList[3]);

  });
});
