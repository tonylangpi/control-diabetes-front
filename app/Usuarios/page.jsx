import React from 'react'
import dynamic from 'next/dynamic';
import Spin from '../components/Spin'
const Users = dynamic(() => import('../components/Usuarios'), { ssr: false, loading: () => <Spin/>})

const Usuarios = () => {
  return (
    <div>
        <Users/>
    </div>
  )
}

export default Usuarios