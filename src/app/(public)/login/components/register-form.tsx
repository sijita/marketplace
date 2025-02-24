'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { registerAction } from '@/app/(public)/login/actions/register';
import useSubmitAction from '@/hooks/use-submit-action';
import SubmitButton from '@/components/submit-button';
import useMatchPasswords from '@/app/(public)/login/hooks/use-match-passwords';

export default function RegisterForm() {
  const {
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    error,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = useMatchPasswords();
  const { submitAction } = useSubmitAction();

  return (
    <form
      action={async (formData) => {
        if (password !== confirmPassword) {
          toast.error('Las contraseñas no coinciden');
          return;
        }

        setPassword('');
        setConfirmPassword('');

        await submitAction(registerAction, formData, '/');
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
        <SubmitButton />
      </div>
    </form>
  );
}
