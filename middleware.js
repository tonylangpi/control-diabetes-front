export {default} from 'next-auth/middleware'; 

export const config = {
    matcher: ["/dashboard", "/", "/Pacientes/:path*", "/Tipos_Diabetes/:path*", "/Medicamentos/:path*", "/Expedientes/:path*", "/Recetas/:path*"
        , "/Usuarios/:path*","/Azucar/:path*",]
} // proteccion de rutas xd