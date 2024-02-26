import dynamic from 'next/dynamic'
const RecetaFichas = dynamic(() => import('../../components/Recetasficha'), { ssr: false, loading: () => <p>Regresando...</p> })
import { getMedicamentoss } from '../../../servicios/moduloMedicamentos.js'

const RecetaFicha = async ({ params }) => {
  const medicament = await getMedicamentoss();
  return (
    <>
      {
        medicament ? (<RecetaFichas fichaID={params.RecetasFicha} medicamento={medicament} />) : (<h2>Validando informacion</h2>)
      }
    </>
  )
}

export default RecetaFicha

