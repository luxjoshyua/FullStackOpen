// import the function to be tested, assign to variable reverse
const reverse = require('../utils/for_testing').reverse;

test('reverse of a', () => {
  const result = reverse('a');
  // expect wraps the resulting value in an object that offers a collection of matcher functions,
  // which we can use to verify the correctness of the result
  expect(result).toBe('a');
});

test('reverse of react', () => {
  const result = reverse('react');
  expect(result).toBe('tcaer');
});

test('reverse of releveler', () => {
  const result = reverse('releveler');
  expect(result).toBe('releveler');
});
