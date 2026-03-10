import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '../../utils/burger-api'; // Используем прямой путь или твой алиас @api
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);
    forgotPasswordApi({ email })
      .then(() => {
        // Устанавливаем флаг, что мы прошли этот этап (нужно для защиты следующей страницы)
        localStorage.setItem('resetPassword', 'true');
        // Переходим на страницу ввода нового пароля
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => {
        // Если API вернуло ошибку, сохраняем её, чтобы показать пользователю
        setError(err);
      });
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
