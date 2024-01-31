import _ from 'lodash';

const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const buildTree = (obj1, obj2) => {
  const buildNode = (key, value1, value2) => {
    if (!_.has(obj1, key)) {
      return { key, value: value2, type: 'added' };
    }

    if (!_.has(obj2, key)) {
      return { key, value: value1, type: 'deleted' };
    }

    if (_.isEqual(value1, value2)) {
      return { key, value: value1, type: 'unchanged' };
    }

    if (isObject(value1) && isObject(value2)) {
      return { key, value: buildTree(value1, value2), type: 'hasChild' };
    }

    return {
      key,
      oldValue: value1,
      value: value2,
      type: 'changed',
    };
  };

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const sortedUnicKeys = _.sortBy(_.union(keys1, keys2));

  return sortedUnicKeys.map((key) => buildNode(key, obj1[key], obj2[key]));
};

export default buildTree;
