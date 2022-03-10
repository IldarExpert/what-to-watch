import {convertDate} from './convert-date';

describe('Function: convertDate', () => {
  it('should convert date to "Month dd yyyy"', () => {
    expect(convertDate("2019-05-08T14:13:56.569Z")).toBe('May 3, 2019');
  });
});
