import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"; 
import  {sequelize}  from '../../../config/db';
import bcrypt from 'bcryptjs'; 
export const authOptions= {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
         email: {label:"Email", type: "email", placeholder:"langpi@gmail.com"},
         password: {label:"Password", type: "password"}
      },
      async authorize(credentials) {
        const res = await sequelize.query(`SELECT  usu.ID_Usuario, usu.Nombres, usu.Apellidos, usu.Correo, usu.Contrasena, r.Descripcion FROM Usuarios usu 
        inner join Roles r on r.Id_Rol = usu.Rol
        WHERE usu.Correo = ?`,{
          type: sequelize.QueryTypes.SELECT,
          replacements: [credentials?.email]
        });
        let usuarioEncontrado = res[0];
        if(usuarioEncontrado == undefined) throw new Error("Credenciales invalidas"); 
        if(usuarioEncontrado.Descripcion != "DOCTOR") throw new Error("Acceso no permitido")
        const passworMatch = await bcrypt.compare(credentials.password, usuarioEncontrado.Contrasena);
        if(!passworMatch) throw new Error("Credenciales invalidas"); 
        return  usuarioEncontrado; 
      }
    })
  ],
  callbacks: {
      jwt({account, token, user, profile, session}){
          if(user) token.user = user; 
          return token;
      },
      session({session,token}){
        session.user = token.user 
        return session;
      }
  },
  pages: {
    signIn : '/login'
  }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }