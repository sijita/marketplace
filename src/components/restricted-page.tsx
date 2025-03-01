import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export default function RestrictedPage() {
  return (
    <div className="mx-auto container flex items-center justify-center min-h-screen px-4 py-12 max-sm:p-10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Acceso Restringido
          </CardTitle>
          <CardDescription>
            Esta página está disponible solo para usuarios autenticados.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Para acceder a este contenido, por favor inicia sesión o crea una
            cuenta si aún no tienes una.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button asChild className="w-full">
            <Link href="/login">Iniciar sesión</Link>
          </Button>
          <Button asChild variant="link" className="w-full">
            <Link href="/">Volver a la página principal</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
