// recommended not to use arrow functions in Cypress tests because they are not able to access the Mocha context
// https://mochajs.org/#arrow-functions
describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'josh',
      username: 'josh',
      password: 'josh',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('user can log in', function () {
    cy.contains('log in').click()
    cy.get('#username').type('josh')
    cy.get('#password').type('josh')
    cy.get('#login-btn').click()

    cy.contains('josh logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click()
      cy.get('#username').type('josh')
      cy.get('#password').type('josh')
      cy.get('#login-btn').click()
    })
  })

  it('a new note can be created', function () {
    cy.contains('User josh logged in')
    // cy.get('#new-note-btn').click()
    // cy.get('#note-input').type('a note created by cypress')
    // cy.get('#save-btn').click()
    // cy.contains('a note created by cypress')
  })
})
