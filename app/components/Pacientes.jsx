"use client";
import Tabla from './Tabla'
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {createPaciente} from '../../servicios/moduloPacientes'
import useSWR from 'swr';
import {pacientes} from '../../columnas/columns'
import ButtonsConfigPacientes from './ButtonEditPaciente';

const PacienteComponente = () => {
  //inicializamos la peticion de los datos con swr en lugar de usar useEffect
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/pacientes/all`,
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
      Nombres:  '',
      Apellidos:  '',
      Telefono:  '',
      DPI: '',
      Fecha_Nacimiento:new Date(),
      Correo:  '',
      Direccion:  '',
      Tipo_de_Sangre:'',
      Cuadro_Clinico:'',
      Genero:  '',
      Estado:  'ACTIVO',
    },
  });

  const enviar = handleSubmit(async (paciente) => {
    try {
      toast.promise(async () => {
        const res = await createPaciente(paciente);
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
    <>
     
      <div className="flex flex-col items-center justify-center h-auto gap-5  bg-gray-50 p-8">
        <form
          className="grid grid-cols-3 gap-4 max-w-screen-md w-full space-y-8"
          onSubmit={enviar}
        >
          <div className="col-span-3 sm:col-span-1 ">
            <label
              htmlFor="Nombres"
              className="block text-sm font-medium leading-6 text-gray-900 "
            >
              Nombres:
            </label>
            <div className="mt-10">
              <input
                type="text"
                name="Nombres"
                id="Nombres"
                autoComplete="given-name"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                {...register("Nombres", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Ingresa nombres válidos",
                  },
                  maxLength: 100,
                  minLength: 2,
                })}
              />
              {errors.Nombres && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.Nombres.message}
                </span>
              )}
              {errors.Nombres?.type === "maxLength" && (
                <span className="mt-1 text-sm text-red-500">
                  Los nombres no deben superar los 100 caracteres
                </span>
              )}
              {errors.Nombres?.type === "minLength" && (
                <span className="mt-1 text-sm text-red-500">
                  Minimo 2 caracteres
                </span>
              )}
            </div>
          </div>

          <div className="col-span-3 sm:col-span-1">
            <label
              htmlFor="Apellidos"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Apellidos:
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="Apellidos"
                id="Apellidos"
                autoComplete="family-name"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.Apellidos ? "border-red-500" : ""
                }`}
                {...register("Apellidos", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/,
                    message: "Ingresa apellidos válidos",
                  },
                  maxLength: 100,
                  minLength: 2,
                })}
              />
              {errors.Apellidos && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.Apellidos.message}
                </p>
              )}
              {errors.Apellidos?.type === "maxLength" && (
                <span className="mt-1 text-sm text-red-500">
                  Los apellidos no deben superar los 100 caracteres
                </span>
              )}
              {errors.Apellidos?.type === "minLength" && (
                <span className="mt-1 text-sm text-red-500">
                  Minimo 2 caracteres
                </span>
              )}
            </div>
          </div>

          <div className="col-span-3 sm:col-span-1">
            <label
              htmlFor="Telefono"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Teléfono:
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="Telefono"
                id="Telefono"
                autoComplete="tel"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.Telefono ? "border-red-500" : ""
                }`}
                {...register("Telefono", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                  pattern: {
                    value: /^\d{8}$/,
                    message: "Ingresa un número de teléfono válido (8 dígitos)",
                  },
                  maxLength: 8,
                  minLength: 8,
                })}
              />
              {errors.Telefono && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.Telefono.message}
                </span>
              )}
              {errors.Telefono?.type === "maxLength" && (
                <span className="mt-1 text-sm text-red-500">
                  el numero de Telefono solo es de 8 digitos
                </span>
              )}
              {errors.Telefono?.type === "minLength" && (
                <span className="mt-1 text-sm text-red-500">
                  El numero de telefono debe tener minimo 8 caracteres
                </span>
              )}
            </div>
          </div>

          <div className="col-span-3 sm:col-span-1">
            <label
              htmlFor="DPI"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Numero de Identificacion :
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="DPI"
                id="DPI"
                autoComplete="cc-number"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 `}
                {...register("DPI", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                  pattern: {
                    value: /^\d{13}$/,
                    message: "Ingresa un número de DPI válido (13 dígitos)",
                  },
                  maxLength: 13,
                  minLength: 13,
                })}
              />
              {errors.DPI && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.DPI.message}
                </span>
              )}
              {errors.DPI?.type === "maxLength" && (
                <span className="mt-1 text-sm text-red-500">
                  La DPI tiene limite de 13 caracteres
                </span>
              )}
              {errors.DPI?.type === "minLength" && (
                <span className="mt-1 text-sm text-red-500">
                  el DPI debe tener al menos 13 caracteres
                </span>
              )}
            </div>
          </div>

          <div className="col-span-3 sm:col-span-1">
            <label
              htmlFor="Fecha_Nacimiento"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Fecha de Nacimiento:
            </label>
            <div className="mt-2">
              <input
                type="date"
                name="Fecha_Nacimiento"
                id="Fecha_Nacimiento"
                autoComplete="bday"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                {...register("Fecha_Nacimiento", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
              />
              {errors.Fecha_Nacimiento && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.Fecha_Nacimiento.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-3 sm:col-span-1">
            <label
              htmlFor="Correo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Correo Electronico:
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="Correo"
                id="Correo"
                autoComplete="email"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.Correo ? "border-red-500" : ""
                }`}
                {...register("Correo", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Ingresa un correo válido",
                  },
                  maxLength: 100,
                  minLength: 2,
                })}
              />
              {errors.Correo && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.Correo.message}
                </span>
              )}
              {errors.Correo?.type === "maxLength" && (
                <span className="mt-1 text-sm text-red-500">
                  El Correo tiene limite de 100 caracteres
                </span>
              )}
              {errors.Correo?.type === "minLength" && (
                <span className="mt-1 text-sm text-red-500">
                  el Correo debe tener al menos 2 caracteres
                </span>
              )}
            </div>
          </div>

          <div className="col-span-3 sm:col-span-1">
            <label
              htmlFor="Direccion"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Dirección de Casa:
            </label>
            <div className="mt-2">
              <textarea
                type="text"
                name="Direccion"
                id="Direccion"
                rows={2}
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("Direccion", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
              />
              {errors.Direccion && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.Direccion.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-3 sm:col-span-1">
            <label
              htmlFor="Tipo_de_Sangre"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tipo de Sangre:
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="Tipo_de_Sangre"
                id="Tipo_de_Sangre"
                autoComplete="blood-type"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("Tipo_de_Sangre", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
              />
              {errors.Tipo_de_Sangre && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.Tipo_de_Sangre.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-3 sm:col-span-1">
            <label
              htmlFor="Genero"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Género:
            </label>
            <div className="mt-2">
              <select
                id="Genero"
                name="Genero"
                autoComplete="off"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("Genero", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
              {errors.Genero && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.Genero.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="Cuadro_Clinico"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cuadro Clinico :
            </label>
            <div className="mt-2">
              <textarea
                id="Cuadro_Clinico"
                name="Cuadro_Clinico"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("Cuadro_Clinico", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                  maxLength: 100,
                })}
                placeholder="Escribe los sucesos del paciente: "
              />
              {errors.Cuadro_Clinico && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.Cuadro_Clinico.message}
                </span>
              )}
              {errors.Cuadro_Clinico?.type === "maxLength" && (
                <span className="mt-1 text-sm text-red-500">
                  El Cuadro_Clinico tiene limite de 100 caracteres
                </span>
              )}
            </div>
          </div>

          <div className="col-span-full m-60 flex gap-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Registrar
            </button>
          </div>
        </form>
        <div className='w-[100%] sm:w-[80%]'>
          <Tabla data={data ? data : []} columns={pacientes ? pacientes : []} ButtonsConfig={ButtonsConfigPacientes} mutate={mutate} />
        </div>
      </div>
    </>
  );
};

export default PacienteComponente;