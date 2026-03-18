import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from '../constructorSlice';

// Заменяем генерацию случайного ID на статичную строку для тестов
jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

describe('тестирование редьюсера burgerConstructor', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const mockBun = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const mockMain = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  it('должен обрабатывать добавление булки', () => {
    // @ts-ignore (игнорируем типы для упрощения теста)
    const action = addIngredient(mockBun);
    const state = constructorReducer(initialState, action);
    
    expect(state.bun).toEqual({ ...mockBun, id: 'test-uuid' });
  });

  it('должен обрабатывать добавление ингредиента (начинки)', () => {
    // @ts-ignore
    const action = addIngredient(mockMain);
    const state = constructorReducer(initialState, action);
    
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({ ...mockMain, id: 'test-uuid' });
  });

  it('должен обрабатывать удаление ингредиента', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [{ ...mockMain, id: 'id-to-remove' }]
    };
    const action = removeIngredient('id-to-remove');
    const state = constructorReducer(stateWithIngredient, action);
    
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен обрабатывать перемещение ингредиента вверх', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { ...mockMain, id: '1', name: 'Первый' },
        { ...mockMain, id: '2', name: 'Второй' }
      ]
    };
    // Перемещаем "Второй" (индекс 1) вверх
    const action = moveIngredientUp(1);
    const state = constructorReducer(stateWithIngredients, action);
    
    expect(state.ingredients[0].name).toBe('Второй');
    expect(state.ingredients[1].name).toBe('Первый');
  });

  it('должен обрабатывать перемещение ингредиента вниз', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { ...mockMain, id: '1', name: 'Первый' },
        { ...mockMain, id: '2', name: 'Второй' }
      ]
    };
    // Перемещаем "Первый" (индекс 0) вниз
    const action = moveIngredientDown(0);
    const state = constructorReducer(stateWithIngredients, action);
    
    expect(state.ingredients[0].name).toBe('Второй');
    expect(state.ingredients[1].name).toBe('Первый');
  });

  it('должен обрабатывать очистку конструктора', () => {
    const fullState = {
      bun: { ...mockBun, id: 'b' },
      ingredients: [{ ...mockMain, id: 'm' }]
    };
    const action = clearConstructor();
    const state = constructorReducer(fullState, action);
    
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});