'use client'
import React from 'react'

//import Sidebar from '../components/Sidebar'

const DashboardPage = () => {
  const backgroundImageUrl = 'https://img.freepik.com/vector-gratis/fondo-monocromatico-blanco-estilo-papel_23-2148996213.jpg?w=1060&t=st=1708060016~exp=1708060616~hmac=2c68d7a203846042ea0443a447374f2f21fba90f5bb70125676a8e67ca934787';

  return (
    <div
    className="min-h-screen flex flex-col md:flex-row items-center justify-center p-4 md:p-8 text-white bg-cover bg-center relative"
    style={{ 
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
      <div className="md:mr-8 text-center md:text-left">
        <h1 className="text-7xl font-bold mb-6 text-black">
          ¡Descubre un Estilo de Vida Saludable con Nosotros!
        </h1>

        <p className="text-lg mb-10 text-black">
          Encuentra recursos y consejos para mantener un estilo de vida saludable y controlar la diabetes.
        </p>

        <div className="mb-14">
          <p className="text-lg font-medium text-black">Recursos disponibles:</p>
          <ul className="list-disc pl-20 text-black">
            <li>Artículos informativos</li>
            <li>Recetas saludables</li>
            <li>Consejos de ejercicio</li>
            <li>Comunidad de apoyo</li>
          </ul>
        </div>
        <p className="text-lg text-black">
          ¡Únete a nosotros y comienza tu viaje hacia un mejor bienestar!
        </p>
      </div>
      <div className="flex-shrink-0 ml-6">
        <div className="rounded-full overflow-hidden w-120 h-85 border-4 border-white">
          <img
            src="https://media.diariolasamericas.com/p/af9016d4e2288e959dc774471a6ec243/adjuntos/216/imagenes/002/550/0002550947/855x0/smart/personas-haciendo-ejercicio.jpg"
            alt="Personas disfrutando de un estilo de vida saludable"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;