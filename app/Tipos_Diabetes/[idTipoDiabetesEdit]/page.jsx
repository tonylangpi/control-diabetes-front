import React from 'react'
import {getTipoDiabetesById} from '../../../servicios/moduloTipoDiabetes'
import dynamic from 'next/dynamic'
const DetallesTiposDiabetesForm = dynamic(() => import('../../components/DetalleTipoDiabetesEdit.jsx'), { ssr: false, loading: () => <p>regresando...</p>})


const DetalleTipoDiabetes = async({params}) => {  
    const tipodiabetes = await getTipoDiabetesById(params.idTipoDiabetesEdit);
  
    return (
    <>
      {
        tipodiabetes ? (<DetallesTiposDiabetesForm detallesTipoDiabetesId={tipodiabetes} />) : (<h2>Validando informacion</h2>)
      }
    </>
  )
}

export default DetalleTipoDiabetes




