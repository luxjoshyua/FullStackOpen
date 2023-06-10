describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'josh',
      username: 'josh',
      password: 'josh',
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
    cy.contains('login')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
    cy.get('#username').type('josh')
    cy.get('#password').type('josh')
    cy.get('#submit-btn').click()

    cy.contains('user josh logged in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('josh')
      cy.get('#password').type('josh')
      cy.get('#submit-btn').click()

      cy.contains('user josh logged in')
    })

    it('login fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('josh')
      cy.get('#password').type('wrong')
      cy.get('#submit-btn').click()

      cy.contains('Please login to view relevant blog posts')

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'User josh logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'josh', password: 'josh' })
    })

    it('a new blog can be created', function () {
      cy.get('#new-blog-btn').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#likes').type(10)
      cy.get('#create-btn').click()
    })

    it('a user can like a blog', function () {
      cy.get('#new-blog-btn').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#likes').type(10)
      cy.get('#create-btn').click()

      cy.get('#view-btn').click()
      cy.get('#like-btn').click()
      cy.get('.likes').should('contain', 10)
    })

    it('user who created a blog can delete it', function () {
      cy.get('#new-blog-btn').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#likes').type(10)
      cy.get('#create-btn').click()

      cy.get('#view-btn').click()
      cy.get('#remove-btn').click()

      cy.get('#view-btn').should('not.exist')
    })

    // test only works if ran in isolation
    it.only('blogs are sorted by likes', function () {
      const blogs = [
        {
          title: 'Blog 1',
          author: 'Author 1',
          likes: 100,
          url: 'https://example.com/blog-1',
        },
        {
          title: 'Blog 2',
          author: 'Author 2',
          likes: 50,
          url: 'https://example.com/blog-2',
        },
        {
          title: 'Blog 3',
          author: 'Author 3',
          likes: 25,
          url: 'https://example.com/blog-3',
        },
        {
          title: 'Blog 4',
          author: 'Author 4',
          likes: 10,
          url: 'https://example.com/blog-4',
        },
        {
          title: 'Blog 5',
          author: 'Author 5',
          likes: 5,
          url: 'https://example.com/blog-5',
        },
      ]

      cy.createBlog(blogs[0].title, blogs[0].author, blogs[0].likes, blogs[0].url)
      cy.createBlog(blogs[1].title, blogs[1].author, blogs[1].likes, blogs[1].url)
      cy.createBlog(blogs[2].title, blogs[2].author, blogs[2].likes, blogs[2].url)
      cy.createBlog(blogs[3].title, blogs[3].author, blogs[3].likes, blogs[3].url)
      cy.createBlog(blogs[4].title, blogs[4].author, blogs[4].likes, blogs[4].url)

      cy.get('.blog-container').eq(0).should('contain', 'Blog 1')
      cy.get('.blog-container').eq(1).should('contain', 'Blog 2')
      cy.get('.blog-container').eq(2).should('contain', 'Blog 3')
      cy.get('.blog-container').eq(3).should('contain', 'Blog 4')
      cy.get('.blog-container').eq(4).should('contain', 'Blog 5')
    })
  })
})
