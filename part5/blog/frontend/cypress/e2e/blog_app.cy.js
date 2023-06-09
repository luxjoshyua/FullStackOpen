describe('Blog app', () => {
  // beforeEach(function () {
  //   cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

  //   const user = {
  //     name: 'josh',
  //     username: 'josh',
  //     password: 'josh',
  //   }

  //   cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  //   cy.visit('')
  // })

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
  })
})
