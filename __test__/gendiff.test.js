import gendiff from '../src/index.js';

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
