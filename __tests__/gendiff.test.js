import fs from 'fs';
import gendiff from '../src';

const files = [
  {
    file1: '__tests__/__fixtures__/before.json',
    file2: '__tests__/__fixtures__/after.json',
  },
  {
    file1: '__tests__/__fixtures__/before.yml',
    file2: '__tests__/__fixtures__/after.yml',
  },
];

test.each(files)('compare files', ({ file1, file2 }) => {
  const expectedResult = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf-8');
  const actualResult = gendiff(file1, file2);
  expect(actualResult).toBe(expectedResult);
});
