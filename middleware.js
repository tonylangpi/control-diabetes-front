export {default} from 'next-auth/middleware'; 

export const config = {
    matcher: ["/dashboard", "/", "/Pacientes/:path*"]
} // proteccion de rutas xd