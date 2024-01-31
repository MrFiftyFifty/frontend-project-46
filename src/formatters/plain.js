import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const plain = (data, path = '') => {
  const formatAdded = (key, value) => `Property '${key}' was added with value: ${stringify(value)}`;
  const formatDeleted = (key) => `Property '${key}' was removed`;
  const formatChanged = (key, oldValue, newValue) => `Property '${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;

  const formatNode = (node, currentPath) => {
    const {
      key, oldValue, value, type,
    } = node;
    const newPath = currentPath === '' ? key : `${currentPath}.${key}`;
    switch (type) {
      case 'added':
        return formatAdded(newPath, value);
      case 'deleted':
        return formatDeleted(newPath);
      case 'changed':
        return formatChanged(newPath, oldValue, value);
      case 'hasChild':
        return plain(value, newPath);
      case 'unchanged':
        return null;
      default:
        throw new Error(`unknown type: ${type}`);
    }
  };

  const values = Object.values(data);
  const strings = values.flatMap((node) => formatNode(node, path));
  return strings.filter(Boolean).join('\n');
};

export default plain;
