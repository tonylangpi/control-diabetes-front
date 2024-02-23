import React from 'react'
import {getMedicamentosById} from '../../../servicios/moduloMedicamentos'
import dynamic from 'next/dynamic'
const DetallesMedicamentosForm = dynamic(() => import('../../components/DetalleMedicamentosEdit.jsx'), { ssr: false, loading: () => <p>Regresando...</p>})



const DetalleMedicamentos = async({params}) => {  
  const medicamentos = await getMedicamentosById(params.idMedicamentosEdit);
  return (
    <>
      {
        medicamentos ? (<DetallesMedicamentosForm detallesMedicamentosId={medicamentos} />) : (<h2>Validando informacion</h2>)
      }
    </>
  )
}

export default DetalleMedicamentos



