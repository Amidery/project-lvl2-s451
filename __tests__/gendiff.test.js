import fs from 'fs';
import gendiff from '../src';

const files = [
  {
    filepath1: '__tests__/__fixtures__/before.json',
    filepath2: '__tests__/__fixtures__/after.json',
  },
  {
    filepath1: '__tests__/__fixtures__/before.yml',
    filepath2: '__tests__/__fixtures__/after.yml',
  },
  {
    filepath1: '__tests__/__fixtures__/before.ini',
    filepath2: '__tests__/__fixtures__/after.ini',
  },
];

test.each(files)('compare files', ({ filepath1, filepath2 }) => {
  const expectedResult = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');
  const actualResult = gendiff(filepath1, filepath2);
  expect(actualResult).toBe(expectedResult);
});
