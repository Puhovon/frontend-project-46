import path from 'node:path';
import _ from 'lodash';
import parser from './parser.js';

const resolvedFilepath = (filepath) => (filepath.includes('__fixtures__/')
  ? path.resolve(filepath)
  : path.resolve(process.cwd(), '__fixtures__/', filepath));

const addDiff = (key, acc, object1, object2) => {
  if (_.has(object1, key) && _.has(object2, key) && object1[key] === object2[key]) {
    return [...acc, `    ${key}: ${object1[key]}`];
  }
  if (_.has(object1, key) && _.has(object2, key) && object1[key] !== object2[key]) {
    return [...acc, `  - ${key}: ${object1[key]}`, `  + ${key}: ${object2[key]}`];
  }
  if (_.has(object1, key) && !_.has(object2, key)) {
    return [...acc, `  - ${key}: ${object1[key]}`];
  }
  if (!_.has(object1, key) && _.has(object2, key)) {
    return [...acc, `  + ${key}: ${object2[key]}`];
  }
  return null;
};

const genDiff = (filePath1, filePath2) => {
  const obj1 = parser(resolvedFilepath(filePath1));
  const obj2 = parser(resolvedFilepath(filePath2));
  const keys = _.uniq([...Object.keys(obj2), ...Object.keys(obj1)]);
  const sortedKeys = _.sortBy(keys);
  const arrOfDiffs = sortedKeys.reduce((acc, key) => addDiff(key, acc, obj1, obj2), []);
  const strOfDiffs = arrOfDiffs.join('\n');
  return `{\n${strOfDiffs}\n}`;
};

export default genDiff;
