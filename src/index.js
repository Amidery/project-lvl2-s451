import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './renderers';

const getAST = (data1, data2) => {
  const dataBeforeKeys = Object.keys(data1);
  const dataAfterKeys = Object.keys(data2);

  const uniqueDataKeys = _.flatten(
    [dataBeforeKeys, dataAfterKeys.filter(key => !_.has(data1, key))],
  );

  const root = {
    keyname: '',
    value: '',
    updatedValue: '',
    type: '',
    children: [],
  };

  const getDiff = (node, key) => {
    if (_.has(data1, key) === _.has(data2, key)) {
      if (data1[key] instanceof Object && data2[key] instanceof Object) {
        return { ...node, keyname: key, children: getAST(data1[key], data2[key]) };
      }
      if (data1[key] === data2[key]) {
        return { ...node, keyname: key, value: data1[key] };
      }
      return {
        ...node, keyname: key, type: 'updated', updatedValue: data2[key], value: data1[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        ...node, keyname: key, type: 'removed', value: data1[key],
      };
    }
    return {
      ...node, keyname: key, type: 'added', value: data2[key],
    };
  };

  const ast = _.flattenDeep(uniqueDataKeys.map(key => getDiff(root, key)));
  return ast;
};

const getContent = filepath => fs.readFileSync(filepath, 'utf-8');
const getExt = filepath => path.extname(filepath);

const gendiff = (pathToFile1, pathToFile2, format) => {
  const dataBefore = parse(getContent(pathToFile1), getExt(pathToFile1));
  const dataAfter = parse(getContent(pathToFile2), getExt(pathToFile2));
  const ast = getAST(dataBefore, dataAfter);
  return render(ast, format);
};

export default gendiff;
