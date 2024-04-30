"use client"
import React, { useState, useEffect  } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  return (() => {
    switch (status) {
      case "loading":
        return null;
      case "authenticated":
         return (
           <header
             className={`flex w-full items-center bg-yellow-400 dark:bg-white`}
           >
             <div className="container">
               <div className="relative -mx-1 flex items-center justify-between">
                 <div className="w-60 max-w-full px-10">
                   <Link href={"/dashboard"} >
                     <img
                       src="https://www.mariposachc.net/wp-content/uploads/2020/03/Diabetes-Ed.-logo.png"
                       alt="logo"
                       className="dark:hidden h-13"
                       
                     />
                      
                     <img
                       src="https://www.mariposachc.net/wp-content/uploads/2020/03/Diabetes-Ed.-logo.png"
                       alt="logo"
                       className="hidden dark:block h-13 "
                     />
                   </Link>
                 </div>
                 <div className="flex w-full items-center justify-between px-4">
                   <div>
                     <button
                       onClick={() => setOpen(!open)}
                       id="navbarToggler"
                       className={` ${
                         open && "navbarTogglerActive"
                       } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
                     >
                       <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color bg-black"></span>
                       <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-colo bg-black"></span>
                       <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color bg-black"></span>
                     
                     </button>
                     <nav
                       // :className="!navbarOpen && 'hidden' "
                       id="navbarCollapse"
                       className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-yellow-400 px-14 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-black ${
                         !open && "hidden"
                       } `}
                     >
                       <ul className="block lg:flex ">
                         <ListItem NavLink="/dashboard">Inicio</ListItem>
                         <ListItem NavLink="/Pacientes">Pacientes</ListItem>
                         <ListItem NavLink="/">Expediente</ListItem>
                         <ListItem NavLink="/Tipos_Diabetes">Tipo de Diabetes</ListItem>
                         <ListItem NavLink="/Medicamentos">Medicamentos</ListItem>
                         <ListItem NavLink="/Usuarios">Usuarios</ListItem>
                         <ListItem NavLink="/Azucar">Nivel Azucar</ListItem>
                         <button
                           onClick={() => {
                             signOut();
                           }}
                           className="hidden rounded-md bg-primary px-7 py-3 text-base font-medium text-white  hover:bg-white"
                         >
                           Cerrar Sesion
                         </button>
                       </ul>
                     </nav>
                   </div>
                   <div className="justify-end pr-16 sm:flex lg:pr-0">
                     <button
                       onClick={() => {
                         signOut();
                       }}
                       className="rounded-md bg-primary px-7 py-3 text-base font-medium text-black hover:bg-white"
                     >
                       Cerrar Sesion
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           </header>
         );
      case "unauthenticated":
        return null;
      default:
        return null;
    }
  })();
};

export default Navbar;

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <Link
          href={NavLink}
          className="flex py-2 text-base font-medium text-body-color hover:text-dark dark:text-dark-6 dark:hover:text-white lg:ml-12 lg:inline-flex"
        >
          {children}
        </Link>
      </li>
    </>
  );
};
