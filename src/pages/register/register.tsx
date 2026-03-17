import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store'; // Твой хук диспатча
import { registerUser } from '../../services/slices/userSlice'; // Твой экшен регистрации
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // 1. Вызываем экшен регистрации
    dispatch(registerUser({ name: userName, email, password }))
      .unwrap() // Дожидаемся успешного ответа от сервера
      .then(() => {
        // 2. Если всё ок — отправляем на главную
        navigate('/', { replace: true });
      })
      .catch((err) => {
        // Здесь можно будет добавить обработку ошибок (например, "email уже занят")
        console.error('Ошибка регистрации:', err);
      });
  };

  return (
    <RegisterUI
      errorText='' // Сюда можно передавать текст ошибки, если запрос упал
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
