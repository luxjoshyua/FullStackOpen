describe('Note ', function () {
  // backend will have no notes, one user on initial test run
  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'josh',
      username: 'josh',
      password: 'josh',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be opened', function () {
    cy.contains('log in').click()
    cy.get('#username').type('josh')
    cy.get('#password').type('josh')
    cy.get('#submit-btn').click()

    cy.contains('josh logged in')
  })

  it.only('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('josh')
    cy.get('#password').type('wrongPassword')
    cy.get('#submit-btn').click()
    // contains works on text content only
    // should allows for more diverse testing

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'josh logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click()
      cy.get('#username').type('josh')
      cy.get('#password').type('josh')
      cy.get('#submit-btn').click()
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })

      it('can be made not important', function () {
        cy.get('.note').contains('another note cypress')
        cy.get('.note').contains('make not important').click()

        cy.get('.note').contains('another note cypress').contains('make important')
      })
    })
  })
})
