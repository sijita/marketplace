'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MapComponent = dynamic(() => import('./colombian-map'), { ssr: false });

export default function ProductsLocation() {
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const savedLat = Cookies.get('userLat');
  const savedLng = Cookies.get('userLng');
  const savedMunicipality = Cookies.get('userCity');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          {savedLat && savedLng ? savedMunicipality : 'Seleccionar ubicación'}
          <MapPin className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Ubicación</DialogTitle>
          <DialogDescription className="text-base">
            Haz clic en el mapa para seleccionar tu ubicación en Colombia y
            mostrar productos cercanos.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <MapComponent />
        </div>
        <DialogFooter>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              Cookies.remove('userLat');
              Cookies.remove('userLng');
              Cookies.remove('userCity');
              setOpen(false);
              router.refresh();
            }}
          >
            Mostrar todos los productos
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              setOpen(false);
              router.refresh();
            }}
          >
            Confirmar ubicación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
