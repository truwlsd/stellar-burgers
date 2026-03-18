import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor,
  initialState
} from '../constructorSlice';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

describe('тестирование редьюсера burgerConstructor', () => {
  const mockBun = { _id: '1', name: 'Булка', type: 'bun' };
  const mockMain = { _id: '2', name: 'Начинка', type: 'main' };

  it('должен обрабатывать добавление булки', () => {
    const action = addIngredient(mockBun as any);
    const state = constructorReducer(initialState, action);
    expect(state.bun).toEqual({ ...mockBun, id: 'test-uuid' });
  });

  it('должен обрабатывать добавление ингредиента', () => {
    const action = addIngredient(mockMain as any);
    const state = constructorReducer(initialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({ ...mockMain, id: 'test-uuid' });
  });

  it('должен обрабатывать удаление ингредиента', () => {
    const state = {
      ...initialState,
      ingredients: [{ ...mockMain, id: '1' }] as any
    };
    const action = removeIngredient('1');
    const newState = constructorReducer(state, action);
    expect(newState.ingredients).toHaveLength(0);
  });

  it('должен обрабатывать перемещение ингредиента', () => {
    const state = {
      ...initialState,
      ingredients: [
        { name: '1', id: '1' },
        { name: '2', id: '2' }
      ]
    } as any;
    const action = moveIngredientUp(1);
    const newState = constructorReducer(state, action);
    expect(newState.ingredients[0].name).toBe('2');
  });

  it('должен обрабатывать очистку конструктора', () => {
    const state = { bun: mockBun, ingredients: [mockMain] } as any;
    const action = clearConstructor();
    const newState = constructorReducer(state, action);
    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toHaveLength(0);
  });
});
