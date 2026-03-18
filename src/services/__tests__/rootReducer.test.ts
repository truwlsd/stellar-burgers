import { rootReducer } from '../store';
import store from '../store'; // Импортируем сам стор, чтобы взять оттуда эталонное начальное состояние

describe('Проверка rootReducer', () => {
  it('должен возвращать начальное состояние при вызове с undefined и неизвестным экшеном', () => {
    
    // Инициализируем стейт через вызов редьюсера с undefined
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    // Сравниваем полученный стейт с эталонным начальным состоянием из store
    expect(state).toEqual(store.getState());
    
  });
});