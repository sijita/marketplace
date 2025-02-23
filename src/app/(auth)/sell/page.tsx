import SellForm from './components/sell-form';

export default function Page() {
  return (
    <div className="container mx-auto py-10 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Publica tu producto</h2>
        <p className="text-sm text-muted-foreground">
          Completa los campos para publicar tu producto en el marketplace
        </p>
      </div>
      <SellForm />
    </div>
  );
}
