import _ from 'lodash';
import fileParse from './parse.js'

const buildProperty = (arr, sign, key, value) => {
    if (value !== undefined) {
        arr.push(`  ${sign} ${key}: ${value}`);
    }
};

const compareValues = (key, value1, value2) => {
    const diff = [];
    if (value1 === value2) {
        buildProperty(diff, ' ', key, value1);
    } else {
        buildProperty(diff, '-', key, value1);
        buildProperty(diff, '+', key, value2);
    }
    return diff;
};

export default (filepath1, filepath2) => {
    const obj1 = fileParse(filepath1);
    const obj2 = fileParse(filepath2);
    const mergedObj = _.merge({}, obj1, obj2);
    const keys = _.sortBy(Object.keys(mergedObj));
    const result = keys
        .reduce((acc, key) => {
            const property = compareValues(key, obj1[key], obj2[key]);
            return [...acc, ...property];
        }, []).join('\n');
    return `{\n${result}\n}`
};
