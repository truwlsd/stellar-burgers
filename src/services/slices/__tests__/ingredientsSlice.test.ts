import ingredientsReducer, {
  fetchIngredients,
  initialState
} from '../ingredientsSlice';

describe('тестирование редьюсера ingredients', () => {
  it('должен менять loading на true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен записывать ингредиенты при fetchIngredients.fulfilled', () => {
    const mockIngredients = [{ _id: '1', name: 'Булка', type: 'bun' }];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('должен записывать ошибку при fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'error' }
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('error');
  });
});
