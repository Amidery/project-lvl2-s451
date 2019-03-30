const getType = (type) => {
  switch (type) {
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
  if (value instanceof Object === false) {
    return value;
  }
  return ['{\n', Object.keys(value).map(key => `${getSpaces(spacesAmount + 6)}${key}: ${value[key]}`), `\n${getSpaces(spacesAmount + 2)}}`].join('');
};

const render = (ast, spacesAmount = 2) => {
  const result = ast.map(obj => `${getSpaces(spacesAmount)}${getType(obj.type)}${obj.keyname}: ${getValue(obj.value, spacesAmount)}${obj.children.length > 0 ? render(obj.children, spacesAmount + 4) : ''}`);
  return ['{', ...result, `${getSpaces(spacesAmount - 2)}}`].join('\n');
};

export default render;
