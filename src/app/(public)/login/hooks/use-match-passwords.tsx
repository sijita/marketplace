import { useState } from 'react';

export default function useMatchPasswords() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setError('Las contraseñas no coinciden');
    } else {
      setError('');
    }
  };

  return {
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    error,
    handlePasswordChange,
    handleConfirmPasswordChange,
  };
}
