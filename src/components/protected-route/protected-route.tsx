import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean; // Если true, то роут только для НЕавторизованных (Login, Register)
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  // 1. Берем данные из userSlice
  const { data, isAuthChecked } = useSelector((state) => state.user);
  const location = useLocation();

  // 2. Пока мы не проверили токен (запрос getUserApi еще идет), показываем спиннер
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // 3. Ситуация: пользователь залогинен, но пытается зайти на страницу Login или Register
  if (onlyUnAuth && data) {
    // Отправляем его на ту страницу, с которой он пришел, или на главную
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  // 4. Ситуация: пользователь НЕ залогинен, но лезет в Личный кабинет
  if (!onlyUnAuth && !data) {
    // Отправляем на логин, но запоминаем, куда он хотел попасть (state={{ from: location }})
    return <Navigate to='/login' state={{ from: location }} />;
  }

  // 5. Если всё в порядке — показываем саму страницу
  return children;
};
