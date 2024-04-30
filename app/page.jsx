"use client";
import Tabla from './components/Tabla'
import { Ficha_Medica } from '../columnas/columns'
import ButtonFichaMedica from './components/ButtonFichaMedica';
import useSWR from 'swr';
export default function Home() {
  const backgroundImageUrl ='https://img.freepik.com/vector-premium/gradiente-fondo-abstracto_773248-148.jpg';
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/fichamedica/all`,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  
  return (
    <main className="flex-col items-center ">
      
      <div className="flex flex-col items-center justify-center h-screen gap-5  bg-gray-50 p-8" style={{  backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover'  }} >
      
        
        <h3 className="text-4xl font-bold  text-center">Listado de Expedientes</h3>
        <Tabla data={data ? data : []} columns={Ficha_Medica ? Ficha_Medica : []} ButtonsConfig={ButtonFichaMedica} mutate={mutate} />
      </div>
    </main>
  );
}