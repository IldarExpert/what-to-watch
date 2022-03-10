import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './footer';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';

const navigator = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
        <Router location={navigator.location} navigator={navigator}>
          <Footer/>
        </Router>
    );
    expect(screen.getAllByText('W')).toHaveLength(2);
    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getByText(/©.*(What to watch Ltd)/i)).toBeInTheDocument();
  });
});
