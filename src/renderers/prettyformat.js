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
  const children = obj.children.length > 0 ? render(obj.children, spacesAmount + 4) : '';

  switch (obj.type) {
    case 'added':
      return `${spaces}+ ${obj.keyname}: ${value}${children}`;
    case 'removed':
      return `${spaces}- ${obj.keyname}: ${value}${children}`;
    case 'updated':
      return `${spaces}+ ${obj.keyname}: ${updatedValue}${children}\n${spaces}- ${obj.keyname}: ${value}${children}`;
    default:
      return `${spaces}  ${obj.keyname}: ${value}${children}`;
  }
};

const renderPretty = (ast, spacesAmount = 2) => {
  const result = ast.map(obj => getString(obj, spacesAmount, renderPretty));
  return ['{', ...result, `${getSpaces(spacesAmount - 2)}}`].join('\n');
};

export default renderPretty;
