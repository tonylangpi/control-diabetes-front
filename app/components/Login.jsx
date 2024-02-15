"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import logo from '../pictures/logo.jpg'
export default function Component() {
  const [error, setError] = useState("");
  const router = useRouter();


const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  try {
      const res = await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirect: false,
        });
        if (res?.error) return setError(res.error);
    
        if (res?.ok) return router.push("/");
  } catch (error) {
    console.error(error);
  }
};
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Sistema de Control de Pacientes</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            Ingresa Credenciales de Médico
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
               <div className="bg-red-600 text-white p-2 mb-2">{error}</div>
              )}
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Correo"
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Clave"
              />
              
            </div>
            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
              Iniciar Sesion
            </button>
          </form>
        </div>
        <div className="md:block hidden w-1/2">
          <Image src={logo} alt="logo" className="rounded 2xl" />
        </div>
      </div>
    </section>
  );
}
