"use client"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { toast } from 'sonner';
import { Receta } from '../../columnas/columns';
import { createRecetaByFicha } from '../../servicios/moduloRecetas'
import TablaReceta from '../components/Tabla'
import ButtonConfigRecetas from '../components/ButtonsConfigExpedientePorPaciente'

const Recetasficha = ({ fichaID, medicamento }) => {
  const router = useRouter();
  const [ficha, setFicha] = useState(fichaID);

  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/receta/allByReceta/${ficha}`,
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
      ID_MEDICAMENTO: '',
      ID_FICHA: fichaID ? fichaID : '',
      Instruccion: '',
    },
  });
  const enviar = handleSubmit(async (receta) => {
    try {
      console.log(receta)
      toast.promise(async () => {
        const res = await createRecetaByFicha(receta);
        if (res?.message) {
          reset();
          mutate();
          return res.message
        } else {
          throw new Error('No se pudo registrar')
        }
      },
        {
          loading: "Loading...",
          success: (data) => `${data}`,
          error: (data) => `${data}`,
        });

    } catch (error) {
      console.log(error);
    }
  });


  return (
    <section className="flex flex-col items-center justify-center h-auto gap-5  bg-gray-50 p-8">
      <h2>Recetas del paciente con codigo {ficha ? ficha : ''}</h2>
      <form className="grid grid-cols-2 gap-2 max-w-screen-md w-full space-y-8" onSubmit={enviar}>

        <div className="col-span-3 sm:col-span-1">
          <label
            htmlFor="ID_MEDICAMENTO"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Tipo de Medicamento:
          </label>
          <div className="mt-2">
            <select
              id="ID_MEDICAMENTO"
              name="ID_MEDICAMENTO"
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("ID_MEDICAMENTO", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            >
              {
                medicamento ?
                  (medicamento.map((item) => (
                    <option key={item.Id_Medicamento} value={item.Id_Medicamento}> {item.Descripcion}</option>
                  ))) : <option value="">Cargando...</option>
              }
            </select>
            {errors.ID_MEDICAMENTO && (
              <span className="mt-1 text-sm text-red-500">
                {errors.ID_MEDICAMENTO.message}
              </span>
            )}
          </div>
        </div>

        <div className="col-span-3 sm:col-span-1">
          <label
            htmlFor="Instruccion"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Instuccion
          </label>
          <div className="mt-2">
            <textarea
              type="text"
              name="Instruccion"
              id="Instruccion"
              rows={2}
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("Instruccion", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />
            {errors.Instruccion && (
              <span className="mt-1 text-sm text-red-500">
                {errors.Instruccion.message}
              </span>
            )}
          </div>
        </div>



        <div className="col-span-full m-40 flex gap-4">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Registrar Receta
          </button>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              router.push('/Pacientes');
            }}
          >
            Regresar
          </button>

        </div>
      </form>

      <div className="w-full sm:w-4/5">
        <h3 className="text-xl font-bold mb-4 mt-28 text-center">Recetas asignadas</h3>
        <TablaReceta data={data ? data : []} columns={Receta} ButtonsConfig={ButtonConfigRecetas} mutate={mutate} />
      </div>

    </section>
  )
}

export default Recetasficha
