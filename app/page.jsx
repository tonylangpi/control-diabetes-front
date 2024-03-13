"use client";
import Tabla from './components/Tabla'
import { Ficha_Medica } from '../columnas/columns'
import ButtonFichaMedica from './components/ButtonFichaMedica';
import useSWR from 'swr';
export default function Home() {

  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/fichamedica/all`,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="w-full">
        <h3 className="text-xl font-bold  text-center">Listado de Expedientes</h3>
        <Tabla data={data ? data : []} columns={Ficha_Medica ? Ficha_Medica : []} ButtonsConfig={ButtonFichaMedica} mutate={mutate} />
      </div>
    </main>
  );
}