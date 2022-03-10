import {convertTime} from './convert-time';

describe('Function: convert-time', () => {
  it('should return time like h:m', () => {
    expect(convertTime(1)).toBe('0h 1m');
    expect(convertTime(0)).toBe('0h 0m');
    expect(convertTime(100)).toBe('1h 40m');
    expect(convertTime(-100)).toBe('0h 0m');
  });
});
