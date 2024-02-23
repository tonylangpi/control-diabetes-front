import React from 'react'
import dynamic from 'next/dynamic';
import Spin from '../components/Spin'
const Medicamentos = dynamic(() => import('../components/Medicamentos'), { ssr: false, loading: () => <Spin/>})

const medicamentos = () => {
  return (
    <div>
      <Medicamentos/>
    </div>
  )
}

export default medicamentos
