"use client";
import React from 'react'
import Tabla from './Tabla'
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {createMedicamentos} from '../../servicios/moduloMedicamentos'
import useSWR from 'swr';
import {Medicamentoss} from '../../columnas/columns'
import ButtonsConfigMedicamentos from './ButtonEditMedicamento';

const backgroundImageUrl ='https://png.pngtree.com/background/20220731/original/pngtree-simple-blank-yellow-background-picture-image_1912911.jpg';

const Medicamentos = () => {

  //inicializamos la peticion de los datos con swr en lugar de usar useEffect
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/medicamento/all`,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      Descripcion:  '',
    },
  });

  const enviar = handleSubmit(async (medicamento) => {
    try {
      toast.promise(async () => {
        const res = await createMedicamentos(medicamento);
        if(res?.message){
          reset();
          mutate();
          return res.message
        }else{
          throw new Error('No se pudo registrar el Medicamento')
        }
      },
      {
        loading: "Cargando...",
        success: (data) => `${data}`,
        error: (data) => `${data}`,
      });
      
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
       <div className="flex flex-col items-center justify-center h-auto gap-5  bg-gray-50 p-10" style={{  backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover'  }} >
      
      <form
        className="grid grid-cols-2 gap-4 max-w-screen-md w-full space-y-8" onSubmit={enviar}
      >
        <div className="col-span-3 sm:col-span-1">
          <label
            htmlFor="Descripcion"
            className="block text-lg font-medium leading-6 text-gray-900"
          >
            Descripcion:
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="Descripcion"
              id="Descripcion"
              autoComplete="given-name"
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              {...register("Descripcion", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                pattern: {
                  value: /^[a-zA-Z0-9\s]+$/,
                  message: "Ingresa nombres válidos",
                },
                maxLength: 100,
                minLength: 2,
              })}
            />
            {errors.Descripcion && (
              <span className="mt-1 text-sm text-red-500">
                {errors.Descripcion.message}
              </span>
            )}
            {errors.Descripcion?.type === "maxLength" && (
              <span className="mt-1 text-sm text-red-500">
                El tipo de diabetes no deben superar los 100 caracteres
              </span>
            )}
            {errors.Descripcion?.type === "minLength" && (
              <span className="mt-1 text-sm text-red-500">
                Minimo 2 caracteres
              </span>
            )}
          </div>
        </div>      

        <div className="m-20 lg:m-20">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Registrar
          </button>
        </div>
      </form>
      <div className="w-full sm:w-4/5">
  <h3 className="text-3xl font-bold mb-10 mt-28 text-center">Tipos de Medicamentos</h3>
        <Tabla data={data ? data : []} columns={Medicamentoss ? Medicamentoss : []} ButtonsConfig={ButtonsConfigMedicamentos} mutate={mutate} />
      </div>
    </div>
  </>
  )
}

export default Medicamentos


