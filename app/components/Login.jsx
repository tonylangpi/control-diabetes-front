"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {toast} from 'sonner';
import Image from 'next/image'
import logo from '../pictures/logo.jpg'
export default function Component() {
  const [error, setError] = useState("");
  const router = useRouter();
  const backgroundImageUrl ='https://img.freepik.com/vector-gratis/fondo-monocromatico-blanco-estilo-papel_23-2149023490.jpg?w=1060&t=st=1708063013~exp=1708063613~hmac=52a12bac02b81877895b3af89b130f353f89cb5e6b4fdc9cc8d140029b3b98cd';


const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  try {
      
        toast.promise(
          async () => {
            const res = await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
              redirect: false,
            })
            if (res?.ok) {
              router.push("/dashboard");
              return "Bienvenido al sistema";
            }
             throw new Error(res.error) ;
          },
          {
            loading: "Loading...",
            success: (data) => `${data}`,
            error: (data) => `${data}`,
          }
        )
  } catch (error) {
    console.error(error);
  }
};
return (
  <section
    className="min-h-screen flex items-center justify-center"
    style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover' }}
  >
    <div className="bg-white flex rounded-lg shadow-2xl max-w-5xl p-8 items-center">
      <div className="md:w-1/2">
        <h2 className="font-bold text-3xl text-center text-gray-800 mb-4">
          Sistema de Control de Pacientes
        </h2>
        <p className="text-sm text-gray-600 mb-4">Ingresa Credenciales de Médico</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {error && (
            <div className="bg-red-600 text-white p-2 rounded-md mb-4">{error}</div>
          )}
          <input
            className="p-3 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            type="email"
            name="email"
            placeholder="Correo"
          />
          <input
            className="p-3 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            type="password"
            name="password"
            placeholder="Clave"
          />
          <button className="bg-blue-500 text-white py-3 rounded-md hover:scale-105 duration-300">
            Iniciar Sesión
          </button>
        </form>
      </div>
      <div className="md:block hidden w-1/2">
        <Image src={logo} alt="logo" className="rounded-lg" />
      </div>
    </div>
  </section>
);
}
