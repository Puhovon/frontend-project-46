import _ from 'lodash';

const buildTree = (data1, data2) => {
  const data2Keys = _.keys(data2);
  const data1Keys = _.keys(data1);
  const sortedKeys = _.sortBy(_.union(data1Keys, data2Keys));

  const childs = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        type: 'removed',
        key,
        value: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        type: 'nested',
        key,
        children: buildTree(data1[key], data2[key]),
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        type: 'unchanged',
        key,
        value: data1[key],
      };
    }
    return {
      type: 'changed',
      key,
      oldValue: data1[key],
      newValue: data2[key],
    };
  });
  return childs;
};

const getDifferenceTree = (data1, data2) => ({
  type: 'root',
  children: buildTree(data1, data2),
});

export default getDifferenceTree;
