
import React from 'react'
import { useRouter } from 'next/navigation'
import {changeStatusPaciente} from '../../servicios/moduloPacientes'
import {toast} from 'sonner'

const ButtonEditPaciente = ({row, mutate}) => {
    const router = useRouter()//enrutador de paginas de nextjs
    const editPaciente = () => {
        console.log('Editando paciente: ', row.getValue("Id_Paciente"))
        router.push(`/Pacientes/${row.getValue("Id_Paciente")}`)
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
        onClick={editPaciente}
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
      <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        data-te-placement="top"
        data-te-ripple-init
        data-te-ripple-color="light"
        title="Cambiar Estado"
        onClick={async () => {
          if (
            !confirm(
              `Deseas cambiar el estado del paciente: ${row.getValue("Nombres")} ${row.getValue("Apellidos")}`
            )
          ) {
            return;
          }
          toast.promise(async()=>{
              const res = await changeStatusPaciente(row.getValue("Id_Paciente"), row.getValue("Estado"))
              if(res.message){
                  mutate()
                  return res.message
              }else{
                  throw new Error('No se pudo cambiar el estado del paciente')
              }
          },
          {
            loading: "Loading...",
            success: (data) => `${data}`,
            error: (data) => `${data}`,
          })
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </>
  );
}

export default ButtonEditPaciente