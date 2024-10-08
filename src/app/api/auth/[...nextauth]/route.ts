
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import oficiosApi from "../../oficios-api";

export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo electronico", type: "email" },
        password: { label: "Password", type: "password" },
      },


      async authorize(credentials) {
        const { data } = await oficiosApi.post(
          `api/Auth/login?user=${credentials!.email}&password=${
            credentials!.password
          }`
        );
        if (data) {
          return {
            id : data.id,
            token: data.token,
            name: data.user,
            user: data.username,
          
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async({ session, token }) => {
     // console.log(`callback session: ${ JSON.stringify( session )}`)
      if( session && session.user) {
        session.user.token = token.token;
        session.user.id = token.id;
        //session.user.empleadoId = token.empleadoId;
        
      }
      return session;
    },
    async jwt( { token, user }) {
     // console.log(`callback token: ${ JSON.stringify( token ) }` );
      if( token &&  user) {
        token.id = user.id;
        token.token = user.token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
  
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
