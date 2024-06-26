import React from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';


const ButtonFichaMedica = ({ row, mutate}) => {
  const router = useRouter();

  const Descarga = async () => {
    try {
      if (row.original.Id_Paciente) {
        console.log('Descargando ficha médica para el paciente con Id_Paciente:', row.original.Id_Paciente);
  
        // Hacer la solicitud a la API
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/fichamedica/descarga/${row.original.Id_Paciente}`,
          {
            responseType: 'blob',  
          }
        );
  
        // Crear un enlace para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
  
        // Nombre del archivo basado en el Id_Paciente y la fecha actual
        const fileName = `Expediente_${row.original.Id_Paciente}_${new Date().toISOString()}.pdf`;
        link.setAttribute('download', fileName);
  
        // Agregar el enlace al cuerpo del documento y hacer clic en él para descargar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
      } else {
        console.error('Id_Paciente no definido');
      }
    } catch (error) {
      console.error('Error durante la descarga:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error de Axios:', error.message, error.response);
      }
    }
  };

  const DescargaEx = async () => {
    try {
      if (row.original.Id_Paciente) {
        console.log('Descargando ficha médica para el paciente con Id_Paciente:', row.original.Id_Paciente);
  
        // Hacer la solicitud a la API
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/fichamedica/descargaEx/${row.original.Id_Paciente}`,
          {
            responseType: 'blob',  
          }
        );
  
        // Crear un enlace para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
  
        // Nombre del archivo basado en el Id_Paciente y la fecha actual
        const fileName = `Fichas_Medicas_${row.original.Id_Paciente}_${new Date().toISOString()}.xlsx`;
        link.setAttribute('download', fileName);
  
        // Agregar el enlace al cuerpo del documento y hacer clic en él para descargar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
      } else {
        console.error('Id_Paciente no definido');
      }
    } catch (error) {
      console.error('Error durante la descarga:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error de Axios:', error.message, error.response);
      }
    }
  };

  const DescargarCs = async () => {
    console.log(row.original.Id_Paciente)
    try {
      if (row.original.Id_Paciente) {
        console.log('Descargando ficha médica para el paciente con Id_Paciente DE CSV:', row.original.Id_Paciente);
  
        // Hacer la solicitud a la API
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/fichamedica/descargaCs/${row.original.Id_Paciente}`,
          {
            responseType: 'blob',  
          }
        );
  
        // Crear un enlace para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
  
        // Nombre del archivo basado en el Id_Paciente y la fecha actual
        const fileName = `Fichas_Medicas_${row.original.Id_Paciente}_${new Date().toISOString()}.csv`;
        link.setAttribute('download', fileName);
  
        // Agregar el enlace al cuerpo del documento y hacer clic en él para descargar
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
      } else {
        console.error('Id_Paciente no definido');
      }
    } catch (error) {
      console.error('Error durante la descarga:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error de Axios:', error.message, error.response);
      }
    }
  
  };

  return (
    <>
      <button
        type="button"
        className="text-white bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
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
      <button
        type="button"
        className="text-white bg-green-500 hover:bg-lime-900 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
        data-te-toggle="tooltip"
        data-te-placement="top"
        data-te-ripple-color="light"
        title="Descargar Excel"
        onClick={DescargaEx}
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
      <button
        type="button"
        className="text-white bg-lime-300 hover:bg-lime-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
        data-te-toggle="tooltip"
        data-te-placement="top"
        data-te-ripple-color="light"
        title="Descargar CSV"
        onClick={DescargarCs}
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