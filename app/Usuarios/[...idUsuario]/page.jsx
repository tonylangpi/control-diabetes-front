import React from 'react'
import dynamic from 'next/dynamic'
import Spin from '../../components/Spin'
import{usuarioByID} from '../../../servicios/moduloUsuarios'
const DetallesFormUsuario = dynamic(() => import('../../components/DetalleEditUsuario'), { ssr: false, loading: () => <Spin/>})

const UsuarioProps = async(props) => {
    const{ idUsuario } = props.params
    const usuario = await usuarioByID(idUsuario)
  return (
    <>
    {
      usuario ? (<DetallesFormUsuario detallesUsuarioEdit={usuario} />) : (<Spin/>)
    }
  </>
  )
}

export default UsuarioProps