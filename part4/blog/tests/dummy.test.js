const listHelper = require('../utils/list_helper');
const blogs = require('../utils/blogList.js');

// to run a specific test:
// $ npm test -- -t 'dummy returns one'
// $ npm test -- -t 'when list has only one blog, equals the like of that'

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  // function only returns 1 at this stage
  expect(result).toBe(1);
});

describe('totalLikes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the like of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe('favouriteBlog', () => {
  test('find the blog that has the most likes', () => {
    const result = listHelper.favouriteBlog(blogs);
    const favourite = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    };
    // use toEqual instead of toBe because toBe tries to verify that the two values are the same value,
    // and not just that they contain the same properties
    expect(result).toEqual(favourite);
  });
});

describe('mostBlogs', () => {
  test('find the author who has the most amount of blogs and also count how many times that author appears', () => {
    const result = listHelper.mostBlogs(blogs);
    const expectedResult = { author: 'Robert C. Martin', blogs: 3 };
    expect(result).toEqual(expectedResult);
  });
});
