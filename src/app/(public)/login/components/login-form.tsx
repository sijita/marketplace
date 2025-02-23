'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginAction } from '@/app/(public)/login/actions/login';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

export default function LoginForm() {
  return (
    <form
      action={async (formData) => {
        const { type, message, errors } = await loginAction(formData);

        if (type === 'success') {
          toast.success(message as string);

          return redirect('/');
        }

        if (type === 'error') {
          toast.error(`${message}: ${errors ? errors : ''}`);
        }
      }}
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
        <Button className="w-full">Iniciar sesión</Button>
      </div>
    </form>
  );
}
