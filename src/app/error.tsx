'use client';
import { Button } from '@/components/ui/button';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center">
      <h2 className="text-3xl font-bold">Hubo un error, intentelo de nuevo</h2>
      <Button className="font-medium" color="primary" onClick={() => reset()}>
        Recargar
      </Button>
    </div>
  );
}
