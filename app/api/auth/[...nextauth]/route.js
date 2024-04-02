import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"; 
import  {sequelize}  from '../../../config/db';
import bcrypt from 'bcryptjs'; 
import axios from "axios";

export const authOptions= {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
         code: {label:"code", type: "text"}
         
      },
      async authorize(credentials) {
          // Enviar el código ingresado para su verificación
          const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/verify`,{
            code: credentials.code, 
          }, {
            headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY
          },
        });
        console.log("Esto es de data:", data)
        return data[0];
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
    signIn : '/login',
  }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }