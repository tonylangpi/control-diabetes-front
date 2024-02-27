import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteRecetaByFicha } from '../../servicios/moduloRecetas'

const ButtonsConfigReceta = ({ row, mutate }) => {
  const router = useRouter();

  const deleteReceta = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta receta?')) {
      return;
    }
  
    try {
      const res = await deleteRecetaByFicha(row.getValue("ID_RECETA"));
  
      if (res?.message) {
        toast.success('Receta eliminada exitosamente');
        mutate();
      } else {
        throw new Error('No se pudo eliminar la receta');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <button
        type="button"
        className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-red-900"
        data-te-toggle="tooltip"
        data-te-placement="top"
        data-te-ripple-color="light"
        title="Eliminar Receta"
        onClick={deleteReceta}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-eraser"
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
          <path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
          <path d="M18 13.3l-6.3 -6.3" />
        </svg>
      </button>
    </>
  );
};

export default ButtonsConfigReceta;
