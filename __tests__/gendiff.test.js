import fs from 'fs';
import gendiff from '../src';

test('generate differences', () => {
  const expectedResult = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');
  const actualResult = gendiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
  expect(actualResult).toBe(expectedResult);
});
