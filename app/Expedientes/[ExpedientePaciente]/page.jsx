import dynamic from 'next/dynamic'
import Spin from '../../components/Spin'
const ExpedientesPorPaciente = dynamic(() => import('../../components/ExpedientesPaciente'), { ssr: false, loading: () => <Spin/>})
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