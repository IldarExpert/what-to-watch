import {transformRating} from './transform-rating';

describe('Function: transform-rating', () => {
  it('should return "not rating" if rating < 0',  () => {
    expect(transformRating(-1))
      .toBe('not rating');
  });
  it('should return rating as text', () => {
    expect(transformRating(1)).toBe('Bad');
    expect(transformRating(0)).toBe('Bad');
    expect(transformRating(1100)).toBe('Awesome');
    expect(transformRating(5)).toBe('Good');
  });
});
