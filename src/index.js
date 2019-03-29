import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const getAST = (data1, data2) => {
  const dataBeforeKeys = Object.keys(data1);
  const dataAfterKeys = Object.keys(data2);

  const uniqueDataKeys = _.flattenDeep(dataAfterKeys.reduce(
    (acc, key) => (_.has(data1, key) ? acc : [acc, key]), dataBeforeKeys,
  ));

  const root = {
    keyname: '',
    value: '',
    status: '',
    children: [],
  };

  const getDiff = (acc, key) => {
    if (_.has(data1, key) === _.has(data2, key)) {
      if (data1[key] instanceof Object && data2[key] instanceof Object) {
        return { ...acc, keyname: key, children: getAST(data1[key], data2[key]) };
      }
      if (data1[key] === data2[key]) {
        return { ...acc, keyname: key, value: data1[key] };
      }
      return [{
        ...acc, keyname: key, status: 'added', value: data2[key],
      }, {
        ...acc, keyname: key, status: 'removed', value: data1[key],
      }];
    }
    if (!_.has(data2, key)) {
      return {
        ...acc, keyname: key, status: 'removed', value: data1[key],
      };
    }
    return {
      ...acc, keyname: key, status: 'added', value: data2[key],
    };
  };

  const ast = _.flattenDeep(uniqueDataKeys.reduce((acc, key) => [...acc, getDiff(root, key)], []));
  return ast;
};

const getStatus = (status) => {
  switch (status) {
    case 'added':
      return '+ ';
    case 'removed':
      return '- ';
    default:
      return '  ';
  }
};

const getSpaces = spacesAmount => ' '.repeat(spacesAmount);

const getValue = (value, spacesAmount) => {
  if (value instanceof Object) {
    return ['{\n', Object.keys(value).map(key => `${getSpaces(spacesAmount + 6)}${key}: ${value[key]}`), `\n${getSpaces(spacesAmount + 2)}}`].join('');
  }
  return value;
};

const render = (ast, spacesAmount = 2) => {
  const result = ast.map(obj => `${getSpaces(spacesAmount)}${getStatus(obj.status)}${obj.keyname}: ${getValue(obj.value, spacesAmount)}${obj.children.length > 0 ? render(obj.children, spacesAmount + 4) : ''}`);
  return ['{', ...result, `${getSpaces(spacesAmount - 2)}}`].join('\n');
};

const getContent = filepath => fs.readFileSync(filepath, 'utf-8');
const getExt = filepath => path.extname(filepath);

const gendiff = (pathToFile1, pathToFile2) => {
  const dataBefore = parse(getContent(pathToFile1), getExt(pathToFile1));
  const dataAfter = parse(getContent(pathToFile2), getExt(pathToFile2));
  const ast = getAST(dataBefore, dataAfter);
  return render(ast);
};

export default gendiff;
