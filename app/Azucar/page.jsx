import React from 'react'
import dynamic from 'next/dynamic';

import Spin from '../components/Spin'
const Azucar = dynamic(() => import('../components/Azucar'), { ssr: false, loading: () => <Spin/>})


const azucar = () => {
  return (
    <div>
       <Azucar/>
       
    </div>
  )
}

export default azucar
