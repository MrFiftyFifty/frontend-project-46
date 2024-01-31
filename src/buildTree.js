import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const sortedUnicKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return sortedUnicKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!Object.hasOwn(obj1, key)) {
      return [...acc, { key, value: value2, type: 'added' }];
    } if (!Object.hasOwn(obj2, key)) {
      return [...acc, { key, value: value1, type: 'deleted' }];
    } if (value1 === value2) {
      return [...acc, { key, value: value1, type: 'unchanged' }];
    } if (_.isObject(value1) && _.isObject(value2)) {
      return [...acc, { key, value: buildTree(value1, value2), type: 'hasChild' }];
    }
    return [
      ...acc,
      {
        key,
        oldValue: value1,
        value: value2,
        type: 'changed',
      },
    ];
  }, []);
};

export default buildTree;
