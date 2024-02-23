import dynamic from 'next/dynamic'
const ExpedientesPorPaciente = dynamic(() => import('../../components/ExpedientesPaciente'), { ssr: false, loading: () => <p>regresando...</p>})
import {getTipoDiabetess} from '../../../servicios/moduloTipoDiabetes.js'

const ExpedientePorPaciente = async({params}) => {
   const tipoDiabetes = await getTipoDiabetess();
  return (
    <>
    {
      tipoDiabetes  ? (<ExpedientesPorPaciente pacienteID={params.ExpedientePaciente} tiposDiabetes={tipoDiabetes} />) : (<h2>Validando informacion</h2>)
    }
  </>
  )
}

export default ExpedientePorPaciente