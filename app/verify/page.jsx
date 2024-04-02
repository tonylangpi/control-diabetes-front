import React from 'react'
import dynamic from 'next/dynamic';
import Spin from '../components/Spin'
const Verify = dynamic(() => import('../components/Verify'), { ssr: false, loading: () => <Spin/>})

const PageVerify = () => {
  return (
    <Verify/>
  )
}

export default PageVerify