"use client";
import React from 'react';
import Tabla from './Tabla'
import { useForm } from "react-hook-form";
import useSWR from 'swr';
import { Azucarrr } from '../../columnas/columns'

const backgroundImageUrl ='https://png.pngtree.com/background/20220731/original/pngtree-minimalist-white-background-picture-image_1908437.jpg';
const TiposAzucar = () => {
    //inicializamos la peticion de los datos con swr en lugar de usar useEffect
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/nivel_azucar/all`,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false, 
    } 
  );
    return (
        <>
          <div className="flex flex-col items-center justify-center h-auto gap-5  bg-gray-50 " style={{  backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover'  }} >
      
   
      <div className="w-full sm:w-4/5">
  <h2 className="text-xl font-bold mb-4 mt-16 text-center">Control de Azucar</h2>
       
        <Tabla data={data ? data : []} columns={Azucarrr ? Azucarrr : []}  mutate={mutate} />
      </div>
    </div>
        </>
    )
}

export default TiposAzucar
