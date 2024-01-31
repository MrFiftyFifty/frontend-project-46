import _ from 'lodash';

const replacer = '    ';

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const currentReplacer = replacer.repeat(depth);
  const entries = Object.entries(data);
  const strings = entries.map(
    ([key, value]) => `${currentReplacer}    ${key}: ${stringify(value, depth + 1)}`,
  );
  return `{\n${strings.join('\n')}\n${currentReplacer}}`;
};

const stylish = (data, depth = 0) => {
  const formatNode = (node, currentReplacer) => {
    const {
      key, oldValue, value, type,
    } = node;
    const formattedValue = stringify(value, depth + 1);
    const formattedOldValue = stringify(oldValue, depth + 1);
    switch (type) {
      case 'added':
        return `${currentReplacer}  + ${key}: ${formattedValue}`;
      case 'deleted':
        return `${currentReplacer}  - ${key}: ${formattedValue}`;
      case 'unchanged':
        return `${currentReplacer}    ${key}: ${formattedValue}`;
      case 'changed':
        return `${currentReplacer}  - ${key}: ${formattedOldValue}\n${currentReplacer}  + ${key}: ${formattedValue}`;
      case 'hasChild':
        return `${currentReplacer}    ${key}: ${stylish(value, depth + 1)}`;
      default:
        throw new Error('unexpected value');
    }
  };

  const currentReplacer = replacer.repeat(depth);
  const result = data.flatMap((node) => formatNode(node, currentReplacer));
  return `{\n${result.join('\n')}\n${currentReplacer}}`;
};

export default stylish;
