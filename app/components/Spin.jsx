import React from 'react';

const Spin = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex items-center space-x-2">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <span className="text-blue-500 font-semibold text-lg"></span>
      </div>
    </div>
  );
}



export default Spin;