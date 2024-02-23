import React from 'react'
import { useRouter } from 'next/navigation'

const ButtonEditMedicamento = ({row, mutate}) => {
    const router = useRouter()//enrutador de paginas de nextjs
    const editMedicamento = () => {
        console.log('Editando Medicamento: ', row.getValue("Id_Medicamento"))
        router.push(`/Medicamentos/${row.getValue("Id_Medicamento")}`)
    }
  
    return (
        <>
        <button
          type="button"
          className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
          data-te-toggle="tooltip"
          data-te-placement="top"
          data-te-ripple-color="light"
          title="Editar"
          onClick={editMedicamento}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </>
  )
}

export default ButtonEditMedicamento

