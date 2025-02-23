'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { registerAction } from '@/app/(public)/login/actions/register';
import { useFormStatus } from 'react-dom';

export default function RegisterForm() {
  const { pending } = useFormStatus();
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

  return (
    <form
      action={async (formData) => {
        if (password !== confirmPassword) {
          return;
        }

        setPassword('');
        setConfirmPassword('');

        const { type, message, errors } = await registerAction(formData);

        if (type === 'success') {
          toast.success(message as string);

          return redirect('/');
        }

        if (type === 'error') {
          console.log(errors);
          toast.error(`${message}${errors ? `: ${errors}` : ''}`);
        }
      }}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            type="text"
            autoCapitalize="words"
            autoComplete="name"
            autoCorrect="off"
            minLength={3}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoCapitalize="none"
            autoComplete="new-password"
            minLength={6}
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirmar contraseña</Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            autoCapitalize="none"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <p className="text-sm text-muted-foreground text-center">
          Continuando estoy de acuerdo con los{' '}
          <Link href="#">Términos y condiciones</Link>
        </p>
        <Button className="w-full" type="submit" disabled={pending}>
          {pending ? (
            <span className="loading loading-spinner"></span>
          ) : (
            'Crear cuenta'
          )}
        </Button>
      </div>
    </form>
  );
}
