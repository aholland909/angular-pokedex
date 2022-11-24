//homepage e2e test

describe('Homepage test', () => {
  it('should visit the initial project page', () => {
    cy.visit('/');
  });
  it('should show some pokemon', () => {
    const card = cy.get('app-pokemon-card').first();
    card.contains('bulbasaur');
  });
  it('should return the correct length', () => {
    cy.get('.pokemon-card').should('have.length', 18)
  })
  it('should see the button pagination button state', () => {
    const nextButtonSelector = '.button-container:nth-child(3) > button';
    const previousButtonSelector = '.button-container:nth-child(1) > button';
    cy.get(previousButtonSelector).should('be.disabled');
    cy.get(nextButtonSelector).should('be.enabled');
  });
  it('should show the next page of pokemon', () => {
    const nextButtonSelector = '.button-container:nth-child(3) > button';
    const previousButtonSelector = '.button-container:nth-child(1) > button';
    cy.get(nextButtonSelector).click()
    
    cy.get(previousButtonSelector).should('be.enabled')
    const card = cy.get('app-pokemon-card').first()
    card.contains('rattata')

    cy.get('.page-number').contains('2')
  })
});
