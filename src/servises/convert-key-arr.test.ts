import {convertKeyObj} from './convert-key-arr';

describe('Function: convertKeyObj', () => {
  it('should return converted key in camelCase', () => {
    const obj = {
      'test_1fd_test': 'some',
      test2: 123,
      '12_fdfd_s': 335,
      '124_124': 123,
      'sdsd_123_dfd_s13_34fdf': 888,
    };
    const objResult = {
      'test1fdTest': 'some',
      'test2': 123,
      '12FdfdS': 335,
      '124124': 123,
      'sdsd123DfdS1334fdf': 888,
    };

    expect(convertKeyObj(obj)).toEqual(objResult);
  });
});
