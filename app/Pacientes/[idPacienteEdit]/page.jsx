import {getPacienteById} from '../../../servicios/moduloPacientes'
import dynamic from 'next/dynamic'
import Spin from '../../components/Spin'
const DetallesPacienteForm = dynamic(() => import('../../components/DetallePacienteEdit'), { ssr: false, loading: () => <Spin/>})
const DetallePaciente = async({params}) => {  
  const paciente = await getPacienteById(params.idPacienteEdit);
  return (
    <>
      {
        paciente ? (<DetallesPacienteForm detallesPacienteId={paciente} />) : (<h2>Validando informacion</h2>)
      }
    </>
  );
}

export default DetallePaciente