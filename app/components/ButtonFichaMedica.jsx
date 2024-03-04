import React from 'react'
import { useRouter } from 'next/navigation'

const ButtonFichaMedica = ({row, mutate}) => {
    const router = useRouter()//enrutador de paginas de nextjs
    const Descarga = () => {
        console.log('Editando Tipo de Diabetes: ', row.getValue("ID_Diabetes"))
        router.push(`/Tipos_Diabetes/${row.getValue("ID_Diabetes")}`)
    }
  return (
    <>
      <button
        type="button"
        className="text-white bg-red-500 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
        data-te-toggle="tooltip"
        data-te-placement="top"
        data-te-ripple-color="light"
        title="Descargar"
        onClick={Descarga}
      >
        <svg xmlns="http://www.w3.org/2000/svg" 
        class="icon icon-tabler icon-tabler-download" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        stroke-width="1.5" 
        stroke="currentColor" 
        fill="none"
         stroke-linecap="round" 
         stroke-linejoin="round">
            <path stroke="none" 
            d="M0 0h24v24H0z" 
            fill="none"/>
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
            <path d="M7 11l5 5l5 -5" />
            <path d="M12 4l0 12" />
            </svg>
      </button>
    </>
  )
}

export default ButtonFichaMedica
