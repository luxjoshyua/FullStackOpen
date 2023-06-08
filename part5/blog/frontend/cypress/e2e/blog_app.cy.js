describe('Blog app', () => {
  beforeEach(function () {
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
    cy.contains('login')
  })
})
