"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Spin from './Spin'
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

export default function Verify() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      code:  ''
    },
  });

  const enviar = handleSubmit(async (codigo) => {
    console.log(codigo)
    try {
      toast.promise(
        async () => {
          const res = await signIn("credentials", {
            code: codigo.code,
            redirect: false,
          });
          if (res?.ok) {
            router.push("/dashboard");
            return "Bienvenido al sistema";
          }
          throw new Error(res.error);
        },
        {
          loading: "Loading...",
          success: (data) => `${data}`, 
          error: (data) => `${data}`,
        }
      );
    } catch (error) {
      console.error(error);
    }
  });

 
  return (
    <div className=" flex items-center justify-center " style={{ marginTop: '20vh' }}>
      <div className="bg-white p-10 rounded-lg shadow-md max-w-md ">
        <h2 className="text-2xl font-semibold mb-6 text-center">Verificar Código</h2>
        <form onSubmit={enviar}>
          <div className="mb-4">
            <label htmlFor="code" className="block  font-medium mb-2">Código:</label>
            <input
              type="text"
              id="code"
              name="code"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-300"
              required
              disabled={loading} // Deshabilitar el campo de entrada durante la carga
              {...register("code", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />
            {errors.code && (
              <span className="mt-1 text-sm text-red-500">
                {errors.code.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={loading} // Deshabilitar el botón durante la carga
          >
            {loading ? <Spin /> : 'Verificar'} 
          </button>
        </form>
      </div>
    </div>
  );
}