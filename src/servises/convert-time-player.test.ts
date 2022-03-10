import {convertTimePlayer} from './convert-time-player';

describe('Function: convert-time-player', () => {
  it('should return time like mm:ss', () => {
    expect(convertTimePlayer(-100)).toBe('-' + '01' + ':' + '40');
    expect(convertTimePlayer(-1000)).toBe('-' + '16' + ':' + '40');
    expect(convertTimePlayer(1000)).toBe('16' + ':' + '40');
  });
  it('should return time like hh:mm:ss', () => {
    expect(convertTimePlayer(-4000)).toBe('-' + '01' + ':' + '06' + ':' + '40');
    expect(convertTimePlayer(-10000)).toBe('-' + '02' + ':' + '46' + ':' + '40');
    expect(convertTimePlayer(10000)).toBe('02' + ':' + '46' + ':' + '40');
  });
  it('should ', () => {
    expect(convertTimePlayer(0)).toBe('00:00');
  });
});
