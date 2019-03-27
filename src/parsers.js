import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const formats = [
  {
    name: '.json',
    check: arg => arg === '.json',
    parser: arg => JSON.parse(fs.readFileSync(arg, 'utf-8')),
  },
  {
    name: '.yml',
    check: arg => arg === '.yml',
    parser: arg => yaml.safeLoad(fs.readFileSync(arg, 'utf-8')),
  },
];

const getFormat = ext => formats.find(
  ({ check }) => check(ext),
);

const parse = (pathToFile) => {
  const ext = path.extname(pathToFile);
  const { parser } = getFormat(ext);
  const fileContent = parser(pathToFile);
  return fileContent;
};

export default parse;
