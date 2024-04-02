"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';
import Spin from './Spin'


export default function Verify() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // Definir el estado success
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Enviar el código ingresado para su verificación
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/verify`, {
        code: code,
      }, {
        headers: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY
      },
    });
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setError('Código inválido');
      }
    } catch (error) {
      console.error('Error al verificar el código:', error);
      setError('Error al verificar el código');
      console.log(response);
    }
  };

  return (
    <div className=" flex items-center justify-center " style={{ marginTop: '20vh' }}>
      <div className="bg-white p-10 rounded-lg shadow-md max-w-md ">
        <h2 className="text-2xl font-semibold mb-6 text-center">Verificar Código</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="code" className="block  font-medium mb-2">Código:</label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-300"
              required
              disabled={loading} // Deshabilitar el campo de entrada durante la carga
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={loading} // Deshabilitar el botón durante la carga
          >
            {loading ? <Spin /> : 'Verificar'} 
          </button>
        </form>
      </div>
    </div>
  );
}