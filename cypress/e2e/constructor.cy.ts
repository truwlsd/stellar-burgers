/// <reference types="cypress" />
describe('тестирование конструктора бургера', function() {
  const modalContainer = '#modals';

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    cy.setCookie('accessToken', 'test-accessToken');
    localStorage.setItem('refreshToken', 'test-refreshToken');

    cy.visit('/');
  });

  // ЭТО НУЖНО ПО ЧЕК-ЛИСТУ: Очистка после каждого теста
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    // 1. Открываем
    cy.contains('Краторная булка N-200i').click();
    
    // ПРОВЕРКА ПО ЧЕК-ЛИСТУ: проверяем, что в модалке именно наша булка
    cy.get(modalContainer).contains('Краторная булка N-200i').should('exist');
    cy.get(modalContainer).contains('Детали ингредиента').should('exist');

    // 2. Закрываем на крестик
    cy.get(modalContainer).find('button').first().click({ force: true });
    cy.contains('Детали ингредиента').should('not.exist');

    // 3. Закрываем по ESC
    cy.contains('Краторная булка N-200i').click();
    cy.get('body').type('{esc}');
    cy.contains('Детали ингредиента').should('not.exist');

    // 4. Закрываем по оверлею
    cy.contains('Краторная булка N-200i').click();
    cy.get(modalContainer).click(10, 10, { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('должен собрать бургер и оформить заказ', () => {
    // 1. Собираем бургер
    cy.get('button').contains('Добавить').first().click(); 

    // 2. Жмем кнопку "Оформить заказ"
    cy.get('button').contains('Оформить заказ').click();

    // 3. Проверяем номер заказа
    cy.get(modalContainer).contains('12345').should('exist');

    // 4. Закрываем модалку
    cy.get(modalContainer).find('button').first().click({ force: true });
    
    // 5. Проверка очистки (по ТЗ и чек-листу)
    cy.contains('12345').should('not.exist');
    cy.get('.constructor-element').should('not.exist');
    cy.contains('Выберите булки').should('exist');
  });
});