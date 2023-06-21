import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Staff",
      credentials: {
        email: { type: "text" },
        phone_number: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials) {
          return null;
        }

        const { email, password, phone_number } = credentials;
        let url = "";
        let inputData = {};
        if (phone_number) {
          url = `${process.env.NEXT_PUBLIC_BACKEND_URL}login`;
          inputData = {
            phone_number,
            password,
          };
        }
        if (email) {
          url = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth_login`;
          inputData = {
            email,
            password,
          };
        }

        try {
          const { data } = await axios.post(url, inputData, {
            headers: {
              Accept: "application/json",
            },
          });
          const user = data.data.auth_user;
          user.token = data.data.token;
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  // pages: {
  //   signIn: "/dashboard/login",
  // },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
