import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    render(<LoadingScreen />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
