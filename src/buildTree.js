import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const sortedUnicKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  let resultObj = []; // Initialize as an empty array
  sortedUnicKeys.forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!Object.hasOwn(obj1, key)) {
      resultObj = [...resultObj, { key, value: value2, type: 'added' }];
    } else if (!Object.hasOwn(obj2, key)) {
      resultObj = [...resultObj, { key, value: value1, type: 'deleted' }];
    } else if (value1 === value2) {
      resultObj = [...resultObj, { key, value: value1, type: 'unchanged' }];
    } else if (_.isObject(value1) && _.isObject(value2)) {
      resultObj = [...resultObj, { key, value: buildTree(value1, value2), type: 'hasChild' }];
    } else {
      resultObj = [
        ...resultObj,
        {
          key,
          oldValue: value1,
          value: value2,
          type: 'changed',
        },
      ];
    }
  });
  return resultObj;
};

export default buildTree;
