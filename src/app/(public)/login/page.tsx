'use client';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './components/login-form';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import RegisterForm from './components/register-form';

export default function Page() {
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="https://as2.ftcdn.net/jpg/02/01/88/03/1000_F_201880339_zTcsW58B73gEN6qQaqm0HvYLuUyP53rv.jpg"
            alt="Login background"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">
            <span className="text-primary">E</span>STORE
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This store has transformed how I shop for my home. The
              quality and design of every piece is exceptional.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            {!isAccountCreated ? (
              <>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Iniciar sesión
                </h1>
                <p className="text-sm text-muted-foreground">
                  Inicia sesión con tu cuenta para continuar
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Regístrate
                </h1>
                <p className="text-sm text-muted-foreground">
                  Crea una cuenta para continuar
                </p>
              </>
            )}
          </div>
          <div className="grid gap-6">
            {!isAccountCreated ? <LoginForm /> : <RegisterForm />}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
            </div>
            <div className="text-center text-sm">
              {!isAccountCreated ? (
                <p>No tienes una cuenta? </p>
              ) : (
                <p>Ya tienes una cuenta? </p>
              )}
              <Button
                onClick={() => setIsAccountCreated(!isAccountCreated)}
                className="underline underline-offset-4 hover:text-primary"
                variant="link"
              >
                {isAccountCreated ? 'Iniciar sesión' : 'Regístrate'}
              </Button>
            </div>
            {!isAccountCreated && (
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary text-center text-sm"
              >
                Olvidaste tu contraseña?
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
