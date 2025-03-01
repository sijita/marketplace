import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? 'Cargando...' : 'Publicar'}
    </Button>
  );
}
