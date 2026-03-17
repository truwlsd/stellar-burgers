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

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    // 1. Открываем
    cy.contains('Краторная булка N-200i').click();
    cy.get(modalContainer).should('not.be.empty');

    // 2. Закрываем 
    cy.get('body').type('{esc}');
    cy.get(modalContainer).children().should('have.length', 0);

    cy.contains('Краторная булка N-200i').click();
    
    cy.get(modalContainer).find('button').first().click({ force: true });
    cy.get(modalContainer).children().should('have.length', 0);
  });

  it('должен собрать бургер и оформить заказ', () => {

    cy.contains('Добавить').click(); 

    // 2. Оформляем заказ
    cy.get('button').contains('Оформить заказ').click();

    // 3. Проверяем номер заказа
    cy.get(modalContainer).contains('12345').should('exist');

    // 4. Закрываем модалку по кнопке
    cy.get(modalContainer).find('button').first().click({ force: true });
    
    // Проверка, что текст 12345 исчез
    cy.contains('12345').should('not.exist');
    
    // 5. Проверяем очистку конструктора (текст, который появляется в пустом поле)
    cy.contains('Выберите булки').should('exist');
  });
});