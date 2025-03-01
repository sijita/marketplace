'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginAction } from '@/app/(public)/login/actions/login';
import useSubmitAction from '@/hooks/use-submit-action';
import SubmitButton from '@/components/submit-button';

export default function LoginForm() {
  const { submitAction } = useSubmitAction();

  return (
    <form
      action={async (formData) =>
        await submitAction(loginAction, formData, '/')
      }
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@domain.com"
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
            placeholder="••••••••"
            type="password"
            autoCapitalize="none"
            autoComplete="current-password"
            autoCorrect="off"
            required
          />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
