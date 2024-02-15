"use client"
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  console.log(status)
  const router = useRouter();
  return (() => {
    switch (status) {
      case "loading":
        return null;
      case "authenticated":
         return (
           <header
             className={`flex w-full items-center bg-white dark:bg-white`}
           >
             <div className="container">
               <div className="relative -mx-4 flex items-center justify-between">
                 <div className="w-60 max-w-full px-4">
                   <Link href={"/"} className="block w-full py-5">
                     <img
                       src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
                       alt="logo"
                       className="dark:hidden"
                     />
                     <img
                       src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg"
                       alt="logo"
                       className="hidden dark:block"
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
                       className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-black ${
                         !open && "hidden"
                       } `}
                     >
                       <ul className="block lg:flex">
                         <ListItem NavLink="/dashboard">Dashboard</ListItem>
                         <ListItem NavLink="/#">Pacientes</ListItem>
                         <ListItem NavLink="/#">Citas</ListItem>
                         <button
                           onClick={() => {
                             signOut();
                           }}
                           className="hidden rounded-md bg-primary px-7 py-3 text-base font-medium text-black hover:bg-red-700"
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
                       className="rounded-md bg-primary px-7 py-3 text-base font-medium text-black hover:bg-red-700"
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
