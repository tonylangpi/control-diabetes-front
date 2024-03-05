import React from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';

const ButtonFichaMedica = ({ row, mutate}) => {
  const router = useRouter();

  const Descarga = async () => {
    try {
      if (row.original.Id_Paciente) {
        console.log('Descargando ficha médica para el paciente con Id_Paciente:', row.original.Id_Paciente);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/fichamedica/descarga/${row.original.Id_Paciente}`,
          {
            responseType: 'blob',  
          }
        );
      } else {
        console.error('Id_Paciente no definido');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error de Axios:', error.message, error.response);
      } 
    }
  };

  return (
    <>
      <button
        type="button"
        className="text-white bg-red-500 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
        data-te-toggle="tooltip"
        data-te-placement="top"
        data-te-ripple-color="light"
        title="Descargar PDF"
        onClick={Descarga}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-download"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
          <path d="M7 11l5 5l5 -5" />
          <path d="M12 4l0 12" />
        </svg>
      </button>
    </>
  );
};

export default ButtonFichaMedica;