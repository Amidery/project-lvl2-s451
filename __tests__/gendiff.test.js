import fs from 'fs';
import gendiff from '../src';

const files = [
  {
    filepath1: '__tests__/__fixtures__/before.json',
    filepath2: '__tests__/__fixtures__/after.json',
    pathtoresult: '__tests__/__fixtures__/result.txt',
  },
  {
    filepath1: '__tests__/__fixtures__/before.yml',
    filepath2: '__tests__/__fixtures__/after.yml',
    pathtoresult: '__tests__/__fixtures__/result.txt',
  },
  {
    filepath1: '__tests__/__fixtures__/before.ini',
    filepath2: '__tests__/__fixtures__/after.ini',
    pathtoresult: '__tests__/__fixtures__/result.txt',
  },
  {
    filepath1: '__tests__/__fixtures__/beforeComplex.json',
    filepath2: '__tests__/__fixtures__/afterComplex.json',
    pathtoresult: '__tests__/__fixtures__/resultComplex.txt',
  },
  {
    filepath1: '__tests__/__fixtures__/beforeComplex.yml',
    filepath2: '__tests__/__fixtures__/afterComplex.yml',
    pathtoresult: '__tests__/__fixtures__/resultComplex.txt',
  },
  {
    filepath1: '__tests__/__fixtures__/beforeComplex.ini',
    filepath2: '__tests__/__fixtures__/afterComplex.ini',
    pathtoresult: '__tests__/__fixtures__/resultComplex.txt',
  },
];

test.each(files)('compare files', ({ filepath1, filepath2, pathtoresult }) => {
  const expectedResult = fs.readFileSync(pathtoresult, 'utf-8');
  const actualResult = gendiff(filepath1, filepath2);
  expect(actualResult).toBe(expectedResult);
});
