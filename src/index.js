import _ from 'lodash';
import parse from './parsers';

const gendiff = (pathToFile1, pathToFile2) => {
  const dataBefore = parse(pathToFile1);
  const dataAfter = parse(pathToFile2);

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
