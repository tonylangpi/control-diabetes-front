import React from 'react'
import dynamic from 'next/dynamic';
import Spin from '../components/Spin'
const Tipos_Diabetes = dynamic(() => import('../components/Tipos_Diabetes'), { ssr: false, loading: () => <Spin/>})

const tipos_Diabetes = () => {
  return (
    <div>
        <Tipos_Diabetes/>
    </div>
  )
}

export default tipos_Diabetes



