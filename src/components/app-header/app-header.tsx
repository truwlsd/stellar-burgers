import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store'; // Импортируем наш хук

export const AppHeader: FC = () => {
  // Пытаемся взять данные пользователя из будущего слайса 'user'
  // Пока его нет, будет возвращаться undefined, и это нормально
  const user = useSelector((state: any) => state.user?.data);

  // Передаем имя пользователя в UI-компонент
  // Если пользователь авторизован, отобразится его имя, иначе — пустота
  return <AppHeaderUI userName={user?.name || ''} />;
};
