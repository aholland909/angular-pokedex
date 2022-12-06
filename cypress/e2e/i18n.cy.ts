// i18n translation test

describe('i18n test', () => {
  it('should check english lang', () => {
    cy.visit('/');

    // get first flag
    const flag = cy.get('.nav-bar-flags div').eq(0);
    flag.click();

    //load translation data
    cy.fixture('../../src/assets/i18n/en.json').then((lang) => {
      // get nav bar links
      cy.get('.nav-bar-links > div > a').should(($a) => {
        expect($a).to.have.length(2);
        expect($a.eq(0)).to.contain(lang.navbar.home);
        expect($a.eq(1)).to.contain(lang.navbar.quiz);
      });

      cy.get('#height').contains(lang.pokemon.height);
      cy.get('#weight').contains(lang.pokemon.weight);
      cy.get('.pokemon-button').contains(lang.pokemon.button);

      cy.get('.button-container:nth-child(1) > button').contains(lang.pagination.previous);
      cy.get('.button-container:nth-child(3) > button').contains(lang.pagination.next);
    });
  });
  it('should check french lang', () => {
    cy.visit('/');

    // get first flag
    const flag = cy.get('.nav-bar-flags div').eq(1);
    flag.click();

    //load translation data
    cy.fixture('../../src/assets/i18n/de.json').then((lang) => {
      // get nav bar links
      cy.get('.nav-bar-links > div > a').should(($a) => {
        expect($a).to.have.length(2);
        expect($a.eq(0)).to.contain(lang.navbar.home);
        expect($a.eq(1)).to.contain(lang.navbar.quiz);
      });

      cy.get('#height').contains(lang.pokemon.height);
      cy.get('#weight').contains(lang.pokemon.weight);
      cy.get('.pokemon-button').contains(lang.pokemon.button);

      cy.get('.button-container:nth-child(1) > button').contains(lang.pagination.previous);
      cy.get('.button-container:nth-child(3) > button').contains(lang.pagination.next);
    });
  });
  it('should check german lang', () => {
    cy.visit('/');

    // get first flag
    const flag = cy.get('.nav-bar-flags div').eq(2);
    flag.click();

    //load translation data
    cy.fixture('../../src/assets/i18n/fr.json').then((lang) => {
      // get nav bar links
      cy.get('.nav-bar-links > div > a').should(($a) => {
        expect($a).to.have.length(2);
        expect($a.eq(0)).to.contain(lang.navbar.home);
        expect($a.eq(1)).to.contain(lang.navbar.quiz);
      });

      cy.get('#height').contains(lang.pokemon.height);
      cy.get('#weight').contains(lang.pokemon.weight);
      cy.get('.pokemon-button').contains(lang.pokemon.button);

      cy.get('.button-container:nth-child(1) > button').contains(lang.pagination.previous);
      cy.get('.button-container:nth-child(3) > button').contains(lang.pagination.next);
    });
  });
});
