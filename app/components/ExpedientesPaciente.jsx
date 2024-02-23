"use client"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession} from "next-auth/react";
import { useState} from "react";
import useSWR from "swr";
import {toast} from 'sonner';
import {ExpedientesByPaciente} from '../../columnas/columns';
import {createExpedienteByPaciente} from '../../servicios/moduloExpedientes'
import TablaExpedientes from '../components/Tabla'
import ButtonConfigExpedientes from '../components/ButtonsConfigExpedientePorPaciente'

const ExpedientesPaciente = ({pacienteID, tiposDiabetes}) => {
  const router = useRouter();
  const [paciente, setPaciente] = useState(pacienteID);//[paciente, setPaciente
  const { data: session } = useSession();
  const idUsuario = session?.user?.ID_Usuario;
    //inicializamos la peticion de los datos con swr en lugar de usar useEffect
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/expedientes/allByPaciente/${paciente}`,
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
    Motivo_Consulta:  '',
    Id_Paciente: pacienteID ? pacienteID : '',
    Id_Usuario:  idUsuario,
    Id_Diabetes: '',
    Fecha: new Date(),
    Diagnostico:  '',
    Proxima_visita:  '',
    Nivel_Azucar:0,
    Tiempo_tratamiento:'',
    Recomendaciones:  '',
    Estado:  'ACTIVO',
  },
});
const enviar = handleSubmit(async (tratamiento) => {
  try {
    console.log(tratamiento)
    toast.promise(async () => {
      const res = await createExpedienteByPaciente(tratamiento);
      if(res?.message){
        reset();
        mutate();
        return res.message
      }else{
        throw new Error('No se pudo registrar el paciente')
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
        <h2>Tratamientos del paciente con codigo {paciente ? paciente : ''}</h2>
      <form className="grid grid-cols-2 gap-2 max-w-screen-md w-full space-y-8" onSubmit={enviar}>
        <div className="col-span-3 sm:col-span-1">
          <label
            htmlFor="Motivo_Consulta"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Motivo de la Consulta:
          </label>
          <div className="mt-10">
            <input
              type="text"
              name="Motivo_Consulta"
              id="Motivo_Consulta"
              autoComplete="given-name"
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              {...register("Motivo_Consulta", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Ingresa nombres válidos",
                },
                maxLength: 200,
                minLength: 2,
              })}
            />
            {errors.Motivo_Consulta && (
              <span className="mt-1 text-sm text-red-500">
                {errors.Motivo_Consulta.message}
              </span>
            )}
            {errors.Motivo_Consulta?.type === "maxLength" && (
              <span className="mt-1 text-sm text-red-500">
                El motivo de la consulta no debe superar los 200 caracteres
              </span>
            )}
            {errors.Motivo_Consulta?.type === "minLength" && (
              <span className="mt-1 text-sm text-red-500">
                Minimo 2 caracteres
              </span>
            )}
          </div>
        </div>
        

        <div className="col-span-3 sm:col-span-1">
          <label
            htmlFor="Id_Diabetes"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Tipo de Diabetes:
          </label>
          <div className="mt-2">
            <select
              id="Id_Diabetes"
              name="Id_Diabetes"
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("Id_Diabetes", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            >
              {
                tiposDiabetes ?
                (tiposDiabetes.map((item)=>(
                  <option key={item.ID_Diabetes} value={item.ID_Diabetes}> {item.Descripcion}</option>
                ))) : <option value="">Cargando...</option>
              }
            </select>
            {errors.Id_Diabetes && (
              <span className="mt-1 text-sm text-red-500">
                {errors.Id_Diabetes.message}
              </span>
            )}
          </div>
        </div>

        <div className="col-span-3 sm:col-span-1">
          <label
            htmlFor="Diagnostico"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Diagnostico
          </label>
          <div className="mt-2">
            <textarea
              type="text"
              name="Diagnostico"
              id="Diagnostico"
              rows={2}
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("Diagnostico", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />
            {errors.Diagnostico && (
              <span className="mt-1 text-sm text-red-500">
                {errors.Diagnostico.message}
              </span>
            )}
          </div>
        </div>

        <div className="col-span-3 sm:col-span-1">
          <label
            htmlFor="Proxima_visita"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Fecha de la proxima visita:
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="Proxima_visita"
              id="Proxima_visita"
              autoComplete="bday"
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
              {...register("Proxima_visita", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />
            {errors.Proxima_visita && (
              <span className="mt-1 text-sm text-red-500">
                {errors.Proxima_visita.message}
              </span>
            )}
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="Nivel_Azucar"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nivel de Azucar mg/dl  :
          </label>
          <div className="mt-2">
            <input
              id="Nivel_Azucar"
              type='number'
              min={0}
              max={1000}
              name="Nivel_Azucar"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("Nivel_Azucar", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
              placeholder="Nivel de la azucar al momento: "
            />
            {errors.Nivel_Azucar && (
              <span className="mt-1 text-sm text-red-500">
                {errors.Nivel_Azucar.message}
              </span>
            )}
          </div>
        </div>


        <div className="col-span-3 sm:col-span-1">
          <label
            htmlFor="Diagnostico"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Tiempo del tratamiento explique:
          </label>
          <div className="mt-2">
            <textarea
              type="text"
              name="Tiempo_tratamiento"
              id="Tiempo_tratamiento"
              rows={2}
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("Tiempo_tratamiento", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                maxLength: 200,
                minLength: 2,
              })}
            />
            {errors.Tiempo_tratamiento && (
              <span className="mt-1 text-sm text-red-500">
                {errors.Tiempo_tratamiento.message}
              </span>
            )}
             {errors.Tiempo_tratamiento?.type === "maxLength" && (
              <span className="mt-1 text-sm text-red-500">
                La especificacion del tiempo de tratamiento no debe superar los 200 caracteres
              </span>
            )}
            {errors.Tiempo_tratamiento?.type === "minLength" && (
              <span className="mt-1 text-sm text-red-500">
                Minimo 2 caracteres
              </span>
            )}
          </div>
        </div>
        
        <div className="col-span-3 sm:col-span-1">
          <label
            htmlFor="Diagnostico"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Recomendaciones explique:
          </label>
          <div className="mt-2">
            <textarea
              type="text"
              name="Recomendaciones"
              id="Recomendaciones"
              rows={2}
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("Recomendaciones", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                maxLength: 200,
                minLength: 2,
              })}
            />
            {errors.Recomendaciones && (
              <span className="mt-1 text-sm text-red-500">
                {errors.Recomendaciones.message}
              </span>
            )}
             {errors.Recomendaciones?.type === "maxLength" && (
              <span className="mt-1 text-sm text-red-500">
                La especificacion de las recomendaciones no debe superar los 200 caracteres
              </span>
            )}
            {errors.Recomendaciones?.type === "minLength" && (
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
            Registrar Tratamiento
          </button>
        </div>
      </form>
      <button
            type="submit"
            className="group relative w-50 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              router.push('/Pacientes');
            }}
          >
            Regresar
          </button>
        <div className='w-[100%] sm:w-[80%]'>
          <h3>Tratamientos asignados</h3>
           <TablaExpedientes data={data ? data : []} columns={ExpedientesByPaciente} ButtonsConfig={ButtonConfigExpedientes} mutate={mutate} />
        </div>
    </section>
  )
}

export default ExpedientesPaciente