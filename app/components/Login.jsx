"use client";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import {toast} from 'sonner';
import Image from 'next/image'
import logo from '../pictures/logo2.png'
import {login} from '../../servicios/moduloUsuarios'

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
            const res = await login( 
             formData.get("email"),
             formData.get("password")
            )
            console.log(res);
            if (res?.info != null) {
              console.log("Respuesta de signIn:", res);
              // Acceder al token en la estructura de respuesta correcta
              const { token } = res;
              // Generar un código aleatorio
              const randomCode = generateRandomCode();
              // Guardar el código en la tabla de usuarios
              await saveAccessCode(formData.get("email"), randomCode);
              // Enviar el código por correo electrónico
              await handleEnviarTokenCorreo(formData.get("email"), token, randomCode);
              router.push("/verify");
              return "Se envió un codigo de autorización, favor de ingresarlo";
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
        setError("Credenciales inválidas");
      }
    };
     const generateRandomCode = () => {
    // Generar un código aleatorio de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000);
    return code.toString();
  };

  const saveAccessCode = async (email, code) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/save-access-code`, {
        email: email,
        code: code
      }, {
        headers: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY
      },
    } );

      if (response.status === 200) {
        console.log("Código de acceso guardado correctamente en la tabla de usuarios.");
      } else {
        console.error("Hubo un error al guardar el código de acceso en la tabla de usuarios.");
        console.error("Respuesta del servidor:", response.data);
      }
    } catch (error) {
      console.error("Error al guardar el código de acceso en la tabla de usuarios:", error);
    }
  };

  const handleEnviarTokenCorreo = async (destinatario, token, code) => {
    try {
      console.log("Destinatario:", destinatario);
      console.log("Token:", token);
      console.log("codigo:", code);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/correoenviado`, {
        destinatario: destinatario,
        code: code 
      }, {
        headers: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY
      },
    });

    if (response.status === 200) {
      // La solicitud fue exitosa
      console.log("Token enviado correctamente al correo electrónico.");
    } else {
      // Hubo un error en la solicitud
      console.error("Hubo un error al enviar el token al correo electrónico.");
      console.error("Respuesta del servidor:", response.data);
    }
  } catch (error) {
    console.error("Error al enviar el token al correo electrónico:", error);
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
        <p className="text-sm text-black mb-6">Ingresa Credenciales de Médico</p>

        <form onSubmit={handleSubmit}  className="flex flex-col gap-8">
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
