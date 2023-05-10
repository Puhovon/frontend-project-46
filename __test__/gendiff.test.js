import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/gendiff.js';

const fileName = fileURLToPath(import.meta.url);
const dirname = path.dirname(fileName);

const getFixturePath = (filename) => path.join(dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const pathToTestFile1 = getFixturePath('file1.json');
const pathToTestFile2 = getFixturePath('file2.json');

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('gendiff', () => {
  expect(genDiff(pathToTestFile1, pathToTestFile2)).toEqual(result);
});
