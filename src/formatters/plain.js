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

const formatAddedProperty = (path, value) => `Property '${path}' was added with value: ${stringify(value)}`;

const formatDeletedProperty = (path) => `Property '${path}' was removed`;

const formatChangedProperty = (path, oldValue, value) => `Property '${path}' was updated. From ${stringify(oldValue)} to ${stringify(value)}`;

const plain = (data) => {
  const iter = (obj, path) => Object.values(obj)
    .map((node) => {
      const {
        key, oldValue, value, type,
      } = node;
      const newPath = path ? `${path}.${key}` : key;
      switch (type) {
        case 'added':
          return formatAddedProperty(newPath, value);
        case 'deleted':
          return formatDeletedProperty(newPath);
        case 'changed':
          return formatChangedProperty(newPath, oldValue, value);
        case 'hasChild':
          return iter(value, newPath);
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unexpected type: ${type}`);
      }
    })
    .filter(Boolean)
    .join('\n');
  return iter(data, '');
};

export default plain;
