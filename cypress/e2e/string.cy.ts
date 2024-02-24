/// <reference types="cypress" />

describe('String', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000/#/recursion')
  })

  it('Button inactive if input is clear', () => {
    cy.get('button').contains('Развернуть').should('be.disabled')
  })
})