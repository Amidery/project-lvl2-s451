const getSpaces = spacesAmount => ' '.repeat(spacesAmount);

const getValue = (value, spacesAmount) => {
  if (value instanceof Object === false) {
    return value;
  }
  return ['{\n', Object.keys(value).map(key => `${getSpaces(spacesAmount + 6)}${key}: ${value[key]}`), `\n${getSpaces(spacesAmount + 2)}}`].join('');
};

const getString = (obj, spacesAmount, render) => {
  const spaces = getSpaces(spacesAmount);
  const value = getValue(obj.value, spacesAmount);
  const updatedValue = getValue(obj.updatedValue, spacesAmount);

  switch (obj.type) {
    case 'haschildren':
      return `${spaces}  ${obj.keyname}: ${render(obj.children, spacesAmount + 4)}`;
    case 'added':
      return `${spaces}+ ${obj.keyname}: ${value}`;
    case 'removed':
      return `${spaces}- ${obj.keyname}: ${value}`;
    case 'updated':
      return `${spaces}+ ${obj.keyname}: ${updatedValue}\n${spaces}- ${obj.keyname}: ${value}`;
    case 'unchanged':
      return `${spaces}  ${obj.keyname}: ${value}`;
    default:
      throw new Error(`${obj.type} - incorrect node type`);
  }
};

const renderPretty = (ast, spacesAmount = 2) => {
  const result = ast.map(obj => getString(obj, spacesAmount, renderPretty));
  return ['{', ...result, `${getSpaces(spacesAmount - 2)}}`].join('\n');
};

export default renderPretty;
