import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/userOrdersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  // Получаем список личных заказов и состояние загрузки из стора
  const orders: TOrder[] = useSelector((state) => state.userOrders.orders);
  const isLoading = useSelector((state) => state.userOrders.loading);

  useEffect(() => {
    // Запрашиваем историю заказов при открытии страницы
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
