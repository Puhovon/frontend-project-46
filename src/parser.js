import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const getName = (file) => path.basename(file);
const getExtention = (file) => path.extname(file);

const parser = (file) => {
  const name = getName(file);
  const extention = getExtention(name);
  return extention !== '.json'
    ? yaml.load(readFileSync(file), 'utf-8')
    : JSON.parse(readFileSync(file), 'utf-8');
};

export default parser;
