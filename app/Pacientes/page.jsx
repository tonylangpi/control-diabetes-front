import React from 'react';
import dynamic from 'next/dynamic';
import Spin from '../components/Spin'
const Pacientes = dynamic(() => import('../components/Pacientes'), { ssr: false, loading: () => <Spin/>})
//import Pacientes from '../components/Pacientes';  // Corregí la importación aquí

const pacientes = () => {
  return (
    <div>
      <Pacientes/>
    </div>
  );
};

export default pacientes;
