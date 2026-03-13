import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store'; // Проверь путь!
import { addIngredient } from '../../services/slices/constructorSlice';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { TIngredient, TConstructorIngredient } from '@utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    // Достаем данные конструктора для расчета счетчика
    const { bun, ingredients } = useSelector(
      (state) => state.burgerConstructor
    );

    // Считаем количество (count)
    const count = useMemo(() => {
      if (ingredient.type === 'bun') {
        return bun?._id === ingredient._id ? 2 : 0;
      }
      return ingredients.filter(
        (item: TConstructorIngredient) => item._id === ingredient._id
      ).length;
    }, [bun, ingredients, ingredient]);

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
