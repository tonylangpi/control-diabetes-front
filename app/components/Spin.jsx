import React from 'react';

const Spin = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
      <div className="flex space-x-4 items-center">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <span className="text-blue-500 font-semibold text-xl">Cargando...</span>
      </div>
    </div>
  );
}


export default Spin;