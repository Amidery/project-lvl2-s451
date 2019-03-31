const getValue = (value) => {
  if (value instanceof Object) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getString = (obj, keyname = '') => {
  const newKeyName = `${keyname}${obj.keyname}`;
  if (obj.children.length > 0) {
    return obj.children.map(child => getString(child, `${newKeyName}.`)).filter(element => element !== '').join('\n');
  }

  switch (obj.type) {
    case 'added':
      return `Property '${newKeyName}' was added with value: ${getValue(obj.value)}`;
    case 'removed':
      return `Property '${newKeyName}' was removed`;
    case 'updated':
      return `Property '${newKeyName}' was updated. From ${getValue(obj.value)} to ${getValue(obj.updatedValue)}`;
    default:
      return '';
  }
};

const renderPlain = (ast) => {
  const result = ast.map(obj => getString(obj)).join('\n');
  return result;
};

export default renderPlain;
