import React from 'react'
import dynamic from 'next/dynamic';
import Spin from '../components/Spin'
const Login = dynamic(() => import('../components/Login'), { ssr: false, loading: () => <Spin/>})

const PageLogin = () => {
  return (
    <Login/>
  )
}

export default PageLogin