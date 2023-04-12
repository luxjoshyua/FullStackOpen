const reverse = (string) => {
  return string.split('').reverse().join('');
};

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };
  // diving by zero in JavaScript results in NaN
  // return array.reduce(reducer, 0) / array.length;
  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

module.exports = {
  reverse,
  average,
};
