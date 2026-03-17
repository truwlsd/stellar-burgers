import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { TIngredient } from '@utils-types';
import { OrderInfoUI } from '../ui/order-info';
import { Preloader } from '../ui';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { fetchFeed } from '../../services/slices/feedSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  // Берем данные из сторов
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.ingredients
  );

  // Ищем заказ во всех доступных источниках (лента или история пользователя)
  const orderData = useSelector(
    (state) =>
      state.feed.orders.find((item) => item.number === Number(number)) ||
      state.userOrders.orders.find((item) => item.number === Number(number))
  );

  // Если данных нет (например, обновили страницу), подгружаем их
  useEffect(() => {
    if (!ingredients.length) dispatch(fetchIngredients());
    if (!orderData) dispatch(fetchFeed());
  }, [dispatch, ingredients.length, orderData]);

  /* Формируем объект с полной информацией о заказе для UI */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    // Группируем ингредиенты и считаем их количество
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) {
          const _id = ingredient._id;
          if (acc[_id]) {
            acc[_id].count++;
          } else {
            acc[_id] = {
              ...ingredient,
              count: 1
            };
          }
        }
        return acc;
      },
      {}
    );

    // Считаем общую стоимость заказа
    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
