'use client';
import { signoutAction } from '@/app/actions/signout';
import { DropdownMenuItem } from './ui/dropdown-menu';
import toast from 'react-hot-toast';

export default function SignoutButton() {
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={async () => {
        await signoutAction();
        toast.success('Sesión cerrada');
      }}
    >
      Cerrar sesión
    </DropdownMenuItem>
  );
}
