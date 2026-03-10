import { FC, useMemo } from 'react';
import { useSelector } from '../../services/store'; // Импортируем хук для доступа к стору
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

// Твоя функция фильтрации (оставляем её)
const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  // 1. Берем данные из слайса ленты заказов (feed)
  const { orders, total, totalToday } = useSelector((state) => state.feed);

  // 2. Скармливаем реальные заказы в функцию фильтрации
  // Используем useMemo, чтобы не пересчитывать при каждом рендере
  const readyOrders = useMemo(() => getOrders(orders, 'done'), [orders]);

  const pendingOrders = useMemo(() => getOrders(orders, 'pending'), [orders]);

  // 3. Формируем объект feed для UI-компонента
  const feed = {
    total,
    totalToday
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
