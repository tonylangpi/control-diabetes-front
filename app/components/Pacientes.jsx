"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const Pacientecomponente = ({ paciente }) => {
  const [formData, setFormData] = useState({
    Nombres: paciente?.Nombres || '',
    Apellidos: paciente?.Apellidos || '',
    Telefono: paciente?.Telefono || '',
    DPI: paciente?.DPI || '',
    Fecha_Nacimiento: paciente?.Fecha_Nacimiento || '',
    Correo: paciente?.Correo || '',
    Direccion: paciente?.Direccion || '',
    Tipo_de_Sangre: paciente?.Tipo_de_Sangre || '',
    Cuadro_Clinico: paciente?.Cuadro_Clinico || '',
    Genero: paciente?.Genero || '',
    Estado: paciente?.Estado || '',
  });

  const [errors, setErrors] = useState({
    Nombres: '',
    Apellidos: '',
    Telefono: '',
    DPI: '',
    Fecha_Nacimiento: '',
    Correo: '',
  });
  const router = useRouter();

  const [patients, setPatients] = useState([]);


  useEffect(() => {
    // Llamada a la API para obtener la información de los pacientes
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/pacientes/all');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error al obtener datos de pacientes', error);
      }
    };

    fetchData();
  }, []); // La dependencia vacía asegura que esta llamada solo se realice al montar el componente


  const handleSubmit = async (e) => {
    e.preventDefault();

    // la llamada a tu API para enviar los datos
    try {
      const response = await fetch('http://localhost:4000/pacientes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // La inserción fue exitosa
        router.push('/dashboard');
      } else {
        // no fue exitosa
        console.error('Error al insertar datos');
      }
    } catch (error) {
      console.error('Error de red', error);
    }

  };



  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-8">
      <form className="grid grid-cols-3 gap-4 max-w-screen-md w-full space-y-8" onSubmit={handleSubmit}>

        <div className="col-span-3 sm:col-span-1">
          <label htmlFor="Nombres" className="block text-sm font-medium leading-6 text-gray-900">
            Nombres:
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="Nombres"
              id="Nombres"
              autoComplete="given-name"
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.Nombres ? 'border-red-500' : '' // Agrega borde rojo si hay un error
                }`}
              value={formData.Nombres}
              onChange={(e) => {
                setFormData({ ...formData, Nombres: e.target.value });

                // Validación del nombre
                const nameRegex = /^[a-zA-Z\s]+$/; // Permitir solo letras y espacios
                if (!e.target.value.match(nameRegex)) {
                  setErrors({ ...errors, Nombres: 'Ingresa un nombre válido' });
                } else {
                  setErrors({ ...errors, Nombres: '' });
                }
              }}
            />
            {errors.Nombres && (
              <p className="mt-1 text-sm text-red-500">{errors.Nombres}</p>
            )}
          </div>
        </div>

        <div className="col-span-3 sm:col-span-1">
          <label htmlFor="Apellidos" className="block text-sm font-medium leading-6 text-gray-900">
            Apellidos:
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="Apellidos"
              id="Apellidos"
              autoComplete="family-name"
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.Apellidos ? 'border-red-500' : ''
                }`}
              value={formData.Apellidos}
              onChange={(e) => {
                setFormData({ ...formData, Apellidos: e.target.value });

                // Validación de apellidos
                const nameRegex = /^[a-zA-Z\s]+$/; // Permitir solo letras y espacios
                if (!e.target.value.match(nameRegex)) {
                  setErrors({ ...errors, Apellidos: 'Ingresa apellidos válidos' });
                } else {
                  setErrors({ ...errors, Apellidos: '' });
                }
              }}
            />
            {errors.Apellidos && (
              <p className="mt-1 text-sm text-red-500">{errors.Apellidos}</p>
            )}
          </div>
        </div>

        <div className="col-span-3 sm:col-span-1">
          <label htmlFor="Telefono" className="block text-sm font-medium leading-6 text-gray-900">
            Teléfono:
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="Telefono"
              id="Telefono"
              autoComplete="tel"
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.Telefono ? 'border-red-500' : ''
                }`}
              value={formData.Telefono}
              onChange={(e) => {
                setFormData({ ...formData, Telefono: e.target.value });

                // Validación de teléfono
                const phoneRegex = /^\d{8}$/; // Permitir solo 8 dígitos numéricos
                if (!e.target.value.match(phoneRegex)) {
                  setErrors({ ...errors, Telefono: 'Ingresa un número de teléfono válido' });
                } else {
                  setErrors({ ...errors, Telefono: '' });
                }
              }}
            />
            {errors.Telefono && (
              <p className="mt-1 text-sm text-red-500">{errors.Telefono}</p>
            )}
          </div>
        </div>

        <div className="col-span-3 sm:col-span-1">
          <label htmlFor="DPI" className="block text-sm font-medium leading-6 text-gray-900">
            Numero de Identificacion:
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="DPI"
              id="DPI"
              autoComplete="cc-number"
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.DPI ? 'border-red-500' : ''
                }`}
              value={formData.DPI}
              onChange={(e) => {
                setFormData({ ...formData, DPI: e.target.value });

                // Validación de DPI
                const dpiRegex = /^\d{13}$/; // Permitir solo 13 dígitos numéricos
                if (!e.target.value.match(dpiRegex)) {
                  setErrors({ ...errors, DPI: 'Ingresa un número de DPI válido (13 dígitos)' });
                } else {
                  setErrors({ ...errors, DPI: '' });
                }
              }}
            />
            {errors.DPI && (
              <p className="mt-1 text-sm text-red-500">{errors.DPI}</p>
            )}
          </div>
        </div>

        <div className="col-span-3 sm:col-span-1">
          <label htmlFor="Fecha_Nacimiento" className="block text-sm font-medium leading-6 text-gray-900">
            Fecha de Nacimiento:
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="Fecha_Nacimiento"
              id="Fecha_Nacimiento"
              autoComplete="bday"
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.Fecha_Nacimiento ? 'border-red-500' : ''
                }`}
              value={formData.Fecha_Nacimiento}
              onChange={(e) => {
                setFormData({ ...formData, Fecha_Nacimiento: e.target.value });

                // Validación de Fecha de Nacimiento
                const inputDate = new Date(e.target.value);
                const currentDate = new Date();

                if (inputDate > currentDate) {
                  setErrors({
                    ...errors,
                    Fecha_Nacimiento: 'La fecha de nacimiento no puede ser en el futuro',
                  });
                } else {
                  setErrors({ ...errors, Fecha_Nacimiento: '' });
                }
              }}
            />
            {errors.Fecha_Nacimiento && (
              <p className="mt-1 text-sm text-red-500">{errors.Fecha_Nacimiento}</p>
            )}
          </div>
        </div>

        <div className="col-span-3 sm:col-span-1">
          <label htmlFor="Correo" className="block text-sm font-medium leading-6 text-gray-900">
            Correo Electronico:
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="Correo"
              id="Correo"
              autoComplete="email"
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.Correo ? 'border-red-500' : ''
                }`}
              value={formData.Correo}
              onChange={(e) => {
                setFormData({ ...formData, Correo: e.target.value });

                // Validación de Correo Electrónico
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(e.target.value)) {
                  setErrors({
                    ...errors,
                    Correo: 'Por favor, introduce un correo electrónico válido',
                  });
                } else {
                  setErrors({ ...errors, Correo: '' });
                }
              }}
            />
            {errors.Correo && (
              <p className="mt-1 text-sm text-red-500">{errors.Correo}</p>
            )}
          </div>
        </div>

        <div className="col-span-3 sm:col-span-1">
          <label htmlFor="Direccion" className="block text-sm font-medium leading-6 text-gray-900">
            Dirección de Casa:
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="Direccion"
              id="Direccion"
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.Direccion}
              onChange={(e) => setFormData({ ...formData, Direccion: e.target.value })}
            />
          </div>
        </div>

        <div className="col-span-3 sm:col-span-1">
          <label htmlFor="Tipo_de_Sangre" className="block text-sm font-medium leading-6 text-gray-900">
            Tipo de Sangre:
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="Tipo_de_Sangre"
              id="Tipo_de_Sangre"
              autoComplete="blood-type"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.Tipo_de_Sangre}
              onChange={(e) => setFormData({ ...formData, Tipo_de_Sangre: e.target.value })}
            />
          </div>
        </div>

        <div className="col-span-3 sm:col-span-1">
          <label htmlFor="Genero" className="block text-sm font-medium leading-6 text-gray-900">
            Género:
          </label>
          <div className="mt-2">
            <select
              id="Genero"
              name="Genero"
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.Genero}
              onChange={(e) => setFormData({ ...formData, Genero: e.target.value })}
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
        </div>

        <div className="col-span-3 sm:col-span-1">
          <label htmlFor="Estado" className="block text-sm font-medium leading-6 text-gray-900">
            Estado:
          </label>
          <div className="mt-2">
            <select
              id="Estado"
              name="Estado"
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.Estado}
              onChange={(e) => setFormData({ ...formData, Estado: e.target.value })}
            >
              <option value="Activo">Activo</option>
              <option value="Pasivo">Pasivo</option>
            </select>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="Cuadro_Clinico" className="block text-sm font-medium leading-6 text-gray-900">
            Cuadro Clinico :
          </label>
          <div className="mt-2">
            <textarea
              id="Cuadro_Clinico"
              name="Cuadro_Clinico"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={formData.Cuadro_Clinico}
              onChange={(e) => setFormData({ ...formData, Cuadro_Clinico: e.target.value })}
              placeholder="Escribe los sucesos del paciente: "
            />
          </div>
        </div>

        <div className="col-span-full">
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Registrar
          </button>
        </div>

      </form>

      {/* Tabla para mostrar la información de los pacientes */}
      <div className="mt-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Lista de Pacientes Diabéticos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow">
            <thead>
              <tr className="bg-gray-100 text-sm text-gray-900">
                <th className="py-2 px-4 border-b">Nombres</th>
                <th className="py-2 px-4 border-b">Apellidos</th>
                <th className="py-2 px-4 border-b">Teléfono</th>
                <th className="py-2 px-4 border-b">Número de Identificación</th>
                <th className="py-2 px-4 border-b">Fecha de Nacimiento</th>
                <th className="py-2 px-4 border-b">Correo Electrónico</th>
                <th className="py-2 px-4 border-b">Dirección</th>
                <th className="py-2 px-4 border-b">Tipo de Sangre</th>
                <th className="py-2 px-4 border-b">Cuadro Clínico</th>
                <th className="py-2 px-4 border-b">Género</th>
                <th className="py-2 px-4 border-b">Estado</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="text-sm text-gray-900">
                  <td className="py-2 px-4 border-b">{patient.Nombres}</td>
                  <td className="py-2 px-4 border-b">{patient.Apellidos}</td>
                  <td className="py-2 px-4 border-b">{patient.Telefono}</td>
                  <td className="py-2 px-4 border-b">{patient.DPI}</td>
                  <td className="py-2 px-4 border-b">{patient.Fecha_Nacimiento}</td>
                  <td className="py-2 px-4 border-b">{patient.Correo}</td>
                  <td className="py-2 px-4 border-b">{patient.Direccion}</td>
                  <td className="py-2 px-4 border-b">{patient.Tipo_de_Sangre}</td>
                  <td className="py-2 px-4 border-b">{patient.Cuadro_Clinico}</td>
                  <td className="py-2 px-4 border-b">{patient.Genero}</td>
                  <td className="py-2 px-4 border-b">{patient.Estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>

  );
};

export default Pacientecomponente;