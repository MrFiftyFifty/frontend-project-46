import _ from 'lodash';

const buildTree = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2)).sort();

  return keys.map((key) => {
    if (!_.has(file1, key)) {
      return { key, value: file2[key], type: 'added' };
    }
    if (!_.has(file2, key)) {
      return { key, value: file1[key], type: 'deleted' };
    }
    if (_.isPlainObject(file1[key]) && _.isPlainObject(file2[key])) {
      return { key, children: buildTree(file1[key], file2[key]), type: 'nested' };
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return { key, value1: file1[key], value2: file2[key], type: 'changed' };
    }
    return { key, value: file1[key], type: 'unchanged' };
  });
};

export default buildTree;
