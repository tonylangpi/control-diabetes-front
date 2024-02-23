import React from 'react'
import { useRouter } from 'next/navigation'

const ButtonsConfigExpedientesPorPacientes = ({row, mutate}) => {
    const router = useRouter()//enrutador de paginas de nextjs
    const manageMedicamentos = () => {
        console.log('Editando Tipo de Diabetes: ', row.getValue("Id_Ficha"))
    }
  return (
    <>
      <button
        type="button"
        className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
        data-te-toggle="tooltip"
        data-te-placement="top"
        data-te-ripple-color="light"
        title="Administrar Medicamentos"
        onClick={manageMedicamentos}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-medicine-syrup"
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
          <path d="M8 21h8a1 1 0 0 0 1 -1v-10a3 3 0 0 0 -3 -3h-4a3 3 0 0 0 -3 3v10a1 1 0 0 0 1 1z" />
          <path d="M10 14h4" />
          <path d="M12 12v4" />
          <path d="M10 7v-3a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3" />
        </svg>
      </button>
    </>
  );
}

export default ButtonsConfigExpedientesPorPacientes
