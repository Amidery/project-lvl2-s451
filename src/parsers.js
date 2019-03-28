import yaml from 'js-yaml';
import ini from 'ini';

const formats = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (fileContent, ext) => formats[ext](fileContent);

export default parse;
