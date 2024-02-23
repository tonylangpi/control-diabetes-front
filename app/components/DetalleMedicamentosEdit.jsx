"use client"
import React from 'react'
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateMedicamentos } from '../../servicios/moduloMedicamentos'
import { toast } from 'sonner'

const DetalleMedicamentosEdit = ({ detallesMedicamentosId }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      Descripcion: detallesMedicamentosId ? detallesMedicamentosId.Descripcion : '',
    },
  });


  //funcion que enviara el edit del formulario
  const onSubmit = handleSubmit(async (data) => {
    try {

      toast.promise(async () => {
        const res = await updateMedicamentos(detallesMedicamentosId.Id_Medicamento, data);
        if (res.message) {
          reset();
          router.push('/Medicamentos');
          return res.message;
        } else {
          throw new Error("Lo chingaste");
        }
      },
        {
          loading: "Cargando...",
          success: (data) => `${data}`,
          error: (data) => `${data}`,
        })
    } catch (error) {
      console.log(error);
    }
  });


  return (
    <section className="flex flex-col items-center justify-center h-auto gap-5  bg-gray-50 p-8">
      <h2>Editar Informacion de Medicamento</h2>
      <form className=" gap-4 max-w-screen-md w-full space-y-8" onSubmit={onSubmit}>
        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="Descripcion"
            className="block text-sm font-medium leading-6 text-gray-900"
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
                  message: "Ingresa Medicamentos válidos",
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
                La Descripcion no deben superar los 100 caracteres
              </span>
            )}
            {errors.Descripcion?.type === "minLength" && (
              <span className="mt-1 text-sm text-red-500">
                Minimo 2 caracteres
              </span>
            )}
          </div>
        </div>



        <div className="col-span-full m-60 flex gap-4">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Editar
          </button>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
            onClick={() => {
              router.push('/Medicamentos');
            }}
          >
            Regresar
          </button>


        </div>
      </form>

    </section>
  )
}

export default DetalleMedicamentosEdit
