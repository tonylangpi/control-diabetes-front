
import React from 'react'
import { useRouter } from 'next/navigation'
import {changeStatusUsuario} from '../../servicios/moduloUsuarios'
import {toast} from 'sonner'

const ButtonConfigUsuarios = ({row, mutate}) => {
    const router = useRouter()//enrutador de paginas de nextjs
    const editUsuario = () => {
      router.push(`/Usuarios/${row.getValue("ID_Usuario")}`)
  }
   const changePass = async () => {
      router.push(`/Usuarios/cambiocontra/${row.getValue("ID_Usuario")}`)
   }
  return (
    <>
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
              `Deseas cambiar el estado del Usuario: ${row.getValue(
                "Nombres"
              )} ${row.getValue("Apellidos")}`
            )
          ) {
            return;
          }
          toast.promise(
            async () => {
              const res = await changeStatusUsuario(
                row.getValue("ID_Usuario"),
                row.getValue("Estado")
              );
              if (res.message) {
                mutate();
                return res.message;
              } else {
                throw new Error("No se pudo cambiar el estado del Usuario");
              }
            },
            {
              loading: "Loading...",
              success: (data) => `${data}`,
              error: (data) => `${data}`,
            }
          );
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
      <button
        type="button"
        className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
        data-te-toggle="tooltip"
        data-te-placement="top"
        data-te-ripple-color="light"
        title="Editar"
        onClick={editUsuario}
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
        className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
        data-te-toggle="tooltip"
        data-te-placement="top"
        data-te-ripple-color="light"
        title="Cambiar contraseña"
        onClick={changePass}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-password-fingerprint"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M17 8c.788 1 1 2 1 3v1" />
          <path d="M9 11c0 -1.578 1.343 -3 3 -3s3 1.422 3 3v2" />
          <path d="M12 11v2" />
          <path d="M6 12v-1.397c-.006 -1.999 1.136 -3.849 2.993 -4.85a6.385 6.385 0 0 1 6.007 -.005" />
          <path d="M12 17v4" />
          <path d="M10 20l4 -2" />
          <path d="M10 18l4 2" />
          <path d="M5 17v4" />
          <path d="M3 20l4 -2" />
          <path d="M3 18l4 2" />
          <path d="M19 17v4" />
          <path d="M17 20l4 -2" />
          <path d="M17 18l4 2" />
        </svg>
      </button>
    </>
  );
}

export default ButtonConfigUsuarios