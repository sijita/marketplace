import { createClient } from '@/utils/supabase/server';
import SellForm from './components/sell-form';
import RestrictedPage from '@/components/restricted-page';

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <RestrictedPage />;
  }

  const { data: departments } = await supabase
    .from('departments')
    .select('id, name');

  const { data: municipalities } = await supabase
    .from('municipalities')
    .select('id, name, department_id');

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name');

  return (
    <div className="container mx-auto py-10 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Publica tu producto</h2>
        <p className="text-sm text-muted-foreground">
          Completa los campos para publicar tu producto en el marketplace
        </p>
      </div>
      <SellForm
        departments={departments ?? []}
        municipalities={municipalities ?? []}
        categories={categories ?? []}
      />
    </div>
  );
}
