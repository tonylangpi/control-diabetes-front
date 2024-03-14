"use client"
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {updateUser} from '../../servicios/moduloUsuarios'
import {toast} from 'sonner'

const DetalleEditUsuario = ({detallesUsuarioEdit}) => {
   const router = useRouter();
   const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
        Nombres: detallesUsuarioEdit ? detallesUsuarioEdit.Nombres: '',
        apellidos: detallesUsuarioEdit ? detallesUsuarioEdit.Apellidos:'',
        Correo: detallesUsuarioEdit ? detallesUsuarioEdit.Correo:'',
    },
  });
      //funcion que enviara el edit del formulario
      const onSubmit = handleSubmit(async (usuarioInfo) => {
        try {
          toast.promise(async () => {
            const res = await updateUser(detallesUsuarioEdit.ID_Usuario,usuarioInfo);
            if(res?.message){
              reset();
              router.push('/Usuarios')
              return res.message
            }else{
              throw new Error('No se pudo editar el usuario')
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
    <section className="flex flex-col items-center justify-center h-auto gap-5  bg-gray-50 p-8">
      <h3 className="text-xl font-bold mb-4  text-center">
        Editar Informacion del Usuario
      </h3>
      <form
        className="grid grid-cols-3 gap-3 max-w-screen-md w-full space-y-8"
        onSubmit={onSubmit}
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

        <div className="col-span-full m-60 flex gap-4">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Editar
          </button>
       
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              router.push("/Usuarios");
            }}
          >
            Regresar
          </button>
        </div>
      </form>
    </section>
  );
}

export default DetalleEditUsuario