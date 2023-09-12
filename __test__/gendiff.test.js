import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
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

test('check json stylish', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(result);
});

test('check yaml stylish', () => {
  expect(gendiff('file1.yaml', 'file2.yaml')).toEqual(result);
});

test('check yml stylish', () => {
  expect(gendiff('file1.yml', 'file2.yml')).toEqual(result);
});
