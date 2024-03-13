"use client";
import React from 'react'
import Tabla from './Tabla'
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {createUsuarios} from '../../servicios/moduloUsuarios'
import useSWR from 'swr';
import {UsuariosColumnas} from '../../columnas/columns'
import ButtonsConfigUsuarios from './ButtonsConfigUsuarios';

const Users = () => {

  //inicializamos la peticion de los datos con swr en lugar de usar useEffect
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/usuarios/all`,
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
        apellidos: '',
        Correo: '',
        Contrasena: '',
        Rol: ''
    },
  });

  const enviar = handleSubmit(async (usuarioInfo) => {
    try {
      toast.promise(async () => {
        const res = await createUsuarios(usuarioInfo);
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
      <div className="flex flex-col items-center justify-center h-auto gap-5  bg-gray-50 p-8">
        <h2>Datos de Usuario de sesion</h2>
        <form
          className="grid grid-cols-3 gap-3 max-w-screen-md w-full space-y-8"
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
                name="apellidos"
                id="apellidos"
                autoComplete="family-name"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.apellidos ? "border-red-500" : ""
                }`}
                {...register("apellidos", {
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
              {errors.apellidos && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.apellidos.message}
                </p>
              )}
              {errors.apellidos?.type === "maxLength" && (
                <span className="mt-1 text-sm text-red-500">
                  Los apellidos no deben superar los 100 caracteres
                </span>
              )}
              {errors.apellidos?.type === "minLength" && (
                <span className="mt-1 text-sm text-red-500">
                  Minimo 2 caracteres
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
              htmlFor="Correo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Contraseña para logueo:
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="Contrasena"
                id="Contrasena"
                autoComplete="Contrasena"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.Contrasena ? "border-red-500" : ""
                }`}
                {...register("Contrasena", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                  maxLength: 20,
                  minLength: 8,
                })}
              />
              {errors.Contrasena && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.Contrasena.message}
                </span>
              )}
              {errors.Contrasena?.type === "maxLength" && (
                <span className="mt-1 text-sm text-red-500">
                  El Contraseña tiene limite de 20 caracteres
                </span>
              )}
              {errors.Contrasena?.type === "minLength" && (
                <span className="mt-1 text-sm text-red-500">
                  La Contraseña debe tener al menos 8 caracteres
                </span>
              )}
            </div>
          </div>

          <div className="col-span-3 sm:col-span-1">
            <label
              htmlFor="Rol"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Rol Usuario:
            </label>
            <div className="mt-2">
              <select
                id="Rol"
                name="Rol"
                autoComplete="off"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register("Rol", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
              >
                <option value={1}>Doctor</option>
              </select>
              {errors.Rol && (
                <span className="mt-1 text-sm text-red-500">
                  {errors.Rol.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-full m-20 flex gap-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Registrar
            </button>
          </div>
        </form>
        <div className="w-full sm:w-4/5">
          <h3 className="text-xl font-bold mb-4 mt-28 text-center">
            Usuarios de sistema
          </h3>
          <Tabla
            data={data ? data : []}
            columns={UsuariosColumnas ? UsuariosColumnas : []}
            ButtonsConfig={ButtonsConfigUsuarios}
            mutate={mutate}
          />
        </div>
      </div>
    </>
  );
}

export default Users


