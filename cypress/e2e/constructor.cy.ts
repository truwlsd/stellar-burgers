/// <reference types="cypress" />

describe('тестирование конструктора бургера', function() {
  const modalContainer = '#modals';

  beforeEach(() => {
    cy.interceptData(); 
    cy.setTokens();     
    cy.visit('/');
    cy.get(modalContainer).as('modal'); 
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    cy.contains('Краторная булка N-200i').click();
    cy.get('@modal').contains('Детали ингредиента').should('exist');

    // ЗАКРЫТИЕ НА КРЕСТИК
    cy.wait(500);
    cy.get('@modal').find('button').first().as('closeBtn');
    cy.get('@closeBtn').click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');

    // ЗАКРЫТИЕ ПО ESC
    cy.contains('Краторная булка N-200i').click();
    cy.wait(500);
    cy.get('body').type('{esc}');
    cy.contains('Детали ингредиента').should('not.exist');

    // ЗАКРЫТИЕ ПО ОВЕРЛЕЮ
    cy.contains('Краторная булка N-200i').click();
    cy.wait(500);
    cy.get('[data-testid=overlay]').click({ force: true }); 
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('должен собрать бургер и оформить заказ', () => {
    cy.get('button').contains('Добавить').first().click(); 
    cy.get('button').contains('Оформить заказ').click();

    cy.get('@modal').contains('12345').should('exist');

    cy.wait(500);
    cy.get('@modal').find('button').first().click({ force: true });
    
    cy.contains('12345').should('not.exist');
    cy.contains('Выберите булки').should('exist');
  });
});