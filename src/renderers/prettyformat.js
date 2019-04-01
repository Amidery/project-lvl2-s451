import _ from 'lodash';

const getSpaces = spacesAmount => ' '.repeat(spacesAmount);

const getValue = (value, spacesAmount) => {
  if (value instanceof Object === false) {
    return value;
  }
  return ['{\n', Object.keys(value).map(key => `${getSpaces(spacesAmount + 6)}${key}: ${value[key]}`), `\n${getSpaces(spacesAmount + 2)}}`].join('');
};

const getString = (obj, spacesAmount, render) => {
  const spaces = getSpaces(spacesAmount);
  const oldValue = getValue(obj.oldValue, spacesAmount);
  const newValue = getValue(obj.newValue, spacesAmount);

  switch (obj.type) {
    case 'haschildren':
      return `${spaces}  ${obj.keyname}: ${render(obj.children, spacesAmount + 4)}`;
    case 'added':
      return `${spaces}+ ${obj.keyname}: ${newValue}`;
    case 'removed':
      return `${spaces}- ${obj.keyname}: ${oldValue}`;
    case 'updated':
      return [`${spaces}+ ${obj.keyname}: ${newValue}`, `${spaces}- ${obj.keyname}: ${oldValue}`];
    case 'unchanged':
      return `${spaces}  ${obj.keyname}: ${oldValue}`;
    default:
      throw new Error(`${obj.type} - incorrect node type`);
  }
};

const renderPretty = (ast, spacesAmount = 2) => {
  const result = _.flatten(ast.map(obj => getString(obj, spacesAmount, renderPretty)));
  return ['{', ...result, `${getSpaces(spacesAmount - 2)}}`].join('\n');
};

export default renderPretty;
