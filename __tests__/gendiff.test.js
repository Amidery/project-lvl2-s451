import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const pathToTests = '__tests__/__fixtures__/';

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
  ['beforeComplex.json', 'afterComplex.json', 'json', 'resultComplexJson.txt'],
  ['beforeComplex.yml', 'afterComplex.yml', 'json', 'resultComplexJson.txt'],
  ['beforeComplex.ini', 'afterComplex.ini', 'json', 'resultComplexJson.txt'],
];

test.each(files)('compare files', (filepath1, filepath2, format, pathtoresult) => {
  const expectedResult = fs.readFileSync(path.join(pathToTests, pathtoresult), 'utf-8').trim();
  const actualResult = gendiff(
    path.join(pathToTests, filepath1), path.join(pathToTests, filepath2), format,
  );
  expect(actualResult).toBe(expectedResult);
});
