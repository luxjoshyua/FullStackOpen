const dummy = (blogs) => {
  if (!blogs) return;
  // receives an array of blog posts as a parameter, and always returns the value 1
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs) return;
  // blogs is an array of objects
  let total = 0;
  blogs.map((blog) => {
    total += Number(blog.likes);
  });
  return total;

  // OR using accumulator
  // const totalLikes = blogs.reduce((acc, blog) => acc + Number(blog.likes), 0)
  // return totalLikes
};

const favouriteBlog = (blogs) => {
  if (!blogs) return;
  // max is the blog that has the most likes so far. If blog has mores votes than max, then it becomes max
  // on the next iteration, and so on until the end of the array is reached
  const mostLikes = blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
  return mostLikes;
};

const mostBlogs = (blogs) => {
  if (!blogs) return;
  // function returns the author who has the largest amount of blogs
  // function also returns the number of blogs the top author has all in one object
  let highestAuthor = blogs.reduce((max, blog) => (max.author > blog.author ? max : blog.author));

  let result = blogs.reduce((acc, o) => ((acc[o.author] = (acc[o.author] || 0) + 1), acc), {});
  const max = Math.max.apply(null, Object.values(result));

  const total = {
    author: highestAuthor,
    blogs: max,
  };

  return total;
};

const mostLikes = (blogs) => {
  if (!blogs) return;
  // function returns the author whose blog posts have the largest amount of likes
  // function also returns the total number of likes the author has received
  // e.g. {
  //   author: "Edsger W. Dijkstra",
  //   likes: 17
  // }

  // get the object with just the values we need: author, likes
  let authorLikes = blogs.reduce((op, { author, likes }) => {
    op[author] = op[author] || 0;
    op[author] += likes;
    return op;
  }, {});

  let highestLikes = Math.max(...Object.values(authorLikes));
  let highestAuthor = Object.keys(authorLikes).find((key) => authorLikes[key] === highestLikes);

  const total = {
    author: highestAuthor,
    likes: highestLikes,
  };

  return total;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
