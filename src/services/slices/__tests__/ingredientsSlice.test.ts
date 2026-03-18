import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';

describe('тестирование редьюсера ingredients (асинхронные экшены)', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('должен менять loading на true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен записывать ингредиенты и выключать loading при fetchIngredients.fulfilled', () => {
    const mockIngredients = [
      { _id: '1', name: 'Ингредиент 1', type: 'main' },
      { _id: '2', name: 'Ингредиент 2', type: 'bun' }
    ];
    
    const action = { 
      type: fetchIngredients.fulfilled.type, 
      payload: mockIngredients 
    };
    
    const state = ingredientsReducer({ ...initialState, loading: true }, action);
    
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('должен записывать ошибку и выключать loading при fetchIngredients.rejected', () => {
    const errorMessage = 'Ошибка при загрузке';
    
    const action = { 
      type: fetchIngredients.rejected.type, 
      error: { message: errorMessage } 
    };
    
    const state = ingredientsReducer({ ...initialState, loading: true }, action);
    
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});