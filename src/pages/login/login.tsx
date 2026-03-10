import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { loginUser } from '../../services/slices/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Пытаемся понять, куда отправить пользователя после входа.
  // Если он шел в /profile, но его перекинуло на логин — после входа он попадет в /profile.
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // 1. Вызываем экшен логина
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        // 2. Переходим на страницу, с которой пришли, или на главную
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error('Ошибка входа:', err);
      });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
