import fs from 'fs';
import gendiff from '../src';

const path = '__tests__/__fixtures__/';

const files = [
  ['before.json', 'after.json', 'pretty', 'resultPretty.txt'],
  ['before.yml', 'after.yml', 'pretty', 'resultPretty.txt'],
  ['before.ini', 'after.ini', 'pretty', 'resultPretty.txt'],
  ['beforeComplex.json', 'afterComplex.json', 'pretty', 'resultComplexPretty.txt'],
  ['beforeComplex.yml', 'afterComplex.yml', 'pretty', 'resultComplexPretty.txt'],
  ['beforeComplex.ini', 'afterComplex.ini', 'pretty', 'resultComplexPretty.txt'],
  ['beforeComplex.json', 'afterComplex.json', 'plain', 'resultComplexPlain.txt'],
  ['beforeComplex.yml', 'afterComplex.yml', 'plain', 'resultComplexPlain.txt'],
  ['beforeComplex.ini', 'afterComplex.ini', 'plain', 'resultComplexPlain.txt'],
];

test.each(files)('compare files', (filepath1, filepath2, format, pathtoresult) => {
  const expectedResult = fs.readFileSync(path + pathtoresult, 'utf-8');
  const actualResult = gendiff(path + filepath1, path + filepath2, format);
  expect(actualResult).toBe(expectedResult);
});
