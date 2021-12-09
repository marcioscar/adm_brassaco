import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Nome",
          type: "text",
          placeholder: "johndoe@test.com",
        },
        password: { label: "Senha", type: "password" },
      },
      authorize: (credentials) => {
        // database look up
        if (
          credentials.username === process.env.BEL_USER &&
          credentials.password === process.env.BEL_PASSWORD
        ) {
          return {
            id: 1,
            name: "brassaco",
            email: "brassaco@brassaco",
          };
        }

        // login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  secret: "brassaco",
  jwt: {
    secret: "brassaco",
    // encryption: true,
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
});
