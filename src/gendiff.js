import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import path from 'node:path';
import _ from 'lodash';

const genDiff = (filePath1, filePath2) => {
  const current = cwd();
  const file1 = readFileSync(path.resolve(current, filePath1));
  const file2 = readFileSync(path.resolve(current, filePath2));
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const keys = _.uniq([...Object.keys(obj2), ...Object.keys(obj1)]);
  const sortedKeys = _.sortBy(keys);
  const arrOfDiffs = sortedKeys.reduce((acc, key) => {
    if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] === obj2[key]) {
      return [...acc, `    ${key}: ${obj1[key]}`];
    }
    if (_.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key]) {
      return [...acc, `  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return [...acc, `  - ${key}: ${obj1[key]}`];
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return [...acc, `  + ${key}: ${obj2[key]}`];
    }
  }, []);
  const strOfDiffs = arrOfDiffs.join('\n');
  return `{\n${strOfDiffs}\n}`;
};

export default genDiff;
