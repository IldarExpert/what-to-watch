import {screen, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import React from 'react';
import PageNotFound from './page-not-found';
import {AppRoute} from '../../consts';

const navigator = createMemoryHistory();

describe('Component: PageNotFound', () => {
  it('should render correctly', () => {
    const {container} = render(<Router navigator={navigator} location={navigator.location}>
      <PageNotFound/>
    </Router>)

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(container.querySelector('a')?.getAttribute('href')).toBe(AppRoute.Main);
  });
});
