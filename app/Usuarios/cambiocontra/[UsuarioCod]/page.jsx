"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {updatePassword} from '../../../../servicios/moduloUsuarios'

const backgroundImageUrl ='https://png.pngtree.com/background/20220807/original/pngtree-yellow-background-picture-image_1915262.jpg';
const CambioPassword = (props) => {
   const router = useRouter();
   const {UsuarioCod} = props.params
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      Contrasena:  '',
    },
  });

  const enviar = handleSubmit(async (datos) => {
    try {
      if (
        !confirm(
          `Estas seguro de cambiar la clave de este usuario`
        )
      ) {
        return;
      }
      toast.promise(
        async () => {
          const res = await updatePassword(
            UsuarioCod,
            datos
          );
          if (res.message) {
            reset();
            router.push('/Usuarios')
            return res.message
          } else {
            throw new Error("No se pudo cambiar el estado del paciente");
          }
        },
        {
          loading: "Loading...",
          success: (data) => `${data}`,
          error: (data) => `${data}`,
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen gap-5  bg-gray-50 p-48" style={{  backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover'  }} >
      
        <h3 className="text-4xl font-bold mb-10  text-center">
          Editar Informacion del Usuario
        </h3>
        <form
          className="grid grid-cols-1 gap-4 max-w-screen-md w-full space-y-8"
          onSubmit={enviar}
        >
          <div className="col-span-3 sm:col-span-1">
            <label
              htmlFor="Contrasena"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Contrasena:
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="Contrasena"
                id="Contrasena"
                autoComplete="given-name"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
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
                  El tipo de diabetes no deben superar los 20 caracteres
                </span>
              )}
              {errors.Contrasena?.type === "minLength" && (
                <span className="mt-1 text-sm text-red-500">
                  Minimo 8 caracteres
                </span>
              )}
            </div>
          </div>

          <div className="col-span-full m-60 flex gap-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Actualizar
            </button>
        
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              router.push("/Usuarios");
            }}
          >
            Regresar
          </button>
        </div>
        </form>
      </section>
    </>
  );
}

export default CambioPassword


