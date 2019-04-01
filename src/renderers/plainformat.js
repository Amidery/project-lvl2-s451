import _ from 'lodash';

const getValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getString = (obj, keyname = '') => {
  const newKeyName = `${keyname}${obj.keyname}`;

  switch (obj.type) {
    case 'haschildren':
      return obj.children.map(child => getString(child, `${newKeyName}.`));
    case 'added':
      return `Property '${newKeyName}' was added with value: ${getValue(obj.newValue)}`;
    case 'removed':
      return `Property '${newKeyName}' was removed`;
    case 'updated':
      return `Property '${newKeyName}' was updated. From ${getValue(obj.oldValue)} to ${getValue(obj.newValue)}`;
    case 'unchanged':
      return '';
    default:
      throw new Error(`${obj.type} - incorrect node type`);
  }
};

const renderPlain = (ast) => {
  const result = _.flattenDeep(ast.map(obj => getString(obj)))
    .filter(element => element !== '')
    .join('\n');
  return result;
};

export default renderPlain;
