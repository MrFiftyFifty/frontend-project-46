import _ from 'lodash';

const buildTreeTree = (data1, data2) => {
  console.log(data1);
  console.log(data2);
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  const difference = {};
  keys.forEach((key) => {
    if (data1[key] !== data2[key]) {
      difference[` - ${key}`] = data1[key];
      difference[` + ${key}`] = data2[key];
    } else {
      difference[`   ${key}`] = data1[key];
    }
  });

  return JSON.stringify(difference, null, ' ').replace(/"|,/gi, '');
};

export default buildTreeTree;
