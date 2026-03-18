/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      setTokens(): Chainable<void>;
      interceptData(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('setTokens', () => {
  cy.setCookie('accessToken', 'test-accessToken');
  localStorage.setItem('refreshToken', 'test-refreshToken');
});

Cypress.Commands.add('interceptData', () => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
});

export {};