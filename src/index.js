import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const getContent = filepath => fs.readFileSync(filepath, 'utf-8');
const getExt = filepath => path.extname(filepath);

const gendiff = (pathToFile1, pathToFile2) => {
  const dataBefore = parse(getContent(pathToFile1), getExt(pathToFile1));
  const dataAfter = parse(getContent(pathToFile2), getExt(pathToFile2));

  const dataBeforeKeys = Object.keys(dataBefore);
  const dataAfterKeys = Object.keys(dataAfter);

  const uniqueDataKeys = _.flattenDeep(dataAfterKeys.reduce(
    (acc, key) => (_.has(dataBefore, key) ? acc : [acc, key]), dataBeforeKeys,
  ));

  const getDiff = (acc, key) => {
    if (_.has(dataBefore, key) === _.has(dataAfter, key)) {
      if (dataBefore[key] === dataAfter[key]) {
        return [...acc, `    ${key}: ${dataBefore[key]}`];
      }
      return [...acc, `  + ${key}: ${dataAfter[key]}`, `  - ${key}: ${dataBefore[key]}`];
    }
    if (!_.has(dataAfter, key)) {
      return [...acc, `  - ${key}: ${dataBefore[key]}`];
    }
    return [...acc, `  + ${key}: ${dataAfter[key]}`];
  };

  const result = uniqueDataKeys.reduce((acc, key) => getDiff(acc, key), '');
  return ['{', ...result, '}\n'].join('\n');
};

export default gendiff;
