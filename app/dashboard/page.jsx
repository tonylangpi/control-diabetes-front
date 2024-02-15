'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
//import Sidebar from '../components/Sidebar'
const DashboardPage = () => {
  const { data: session } = useSession();
  return (
    <>
       <p><strong>{session?.user?.Nombres}</strong></p>
        <p><strong>{session?.user?.Apellidos}</strong></p>
        <p><strong>{session?.user?.Correo}</strong></p>
        <p><strong>{session?.user?.Descripcion}</strong></p>
      <button
      onClick={() => {
        signOut();
      }}
      className="btn btn-outline-danger me-4"
    >
      Cerrar Sesion
    </button>
    </>
      
  )
}

export default DashboardPage
