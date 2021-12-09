import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import bg from "/public/fundobrass.jpg";
export default function SignIn({ csrfToken }) {
  const { error } = useRouter().query;
  return (
    //pagina login
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <div
        className="min-h-screen  flex justify-center items-center"
        style={{
          backgroundImage: `url(${bg.src})`,
          width: "100%",
          height: "100%",
        }}
      >
        <div className="py-12 px-12 border-2 bg-gray-300 rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl text-red-500 font-bold text-center mb-4 cursor-pointer">
              Sistema Brassaco
            </h1>
            <p className="w-80 text-center text-sm mb-8 font-semibold text-blue-700 tracking-wide cursor-pointer">
              Entre com nome e senha para acessar
            </p>
          </div>
          <div className="space-y-4">
            <input
              name="username"
              type="text"
              placeholder="Nome"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />
            <input
              name="password"
              type="password"
              placeholder="Senha"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
            />
          </div>
          <div className="text-center mt-6">
            <button className="py-3 w-64 text-xl text-white bg-blue-400 rounded-2xl">
              Entrar
            </button>
            <p className="mt-4 text-sm text-red">
              {error?.length > 0 && <h2>Verifique usuário e senha</h2>}
            </p>
          </div>
        </div>
      </div>
    </form>
    ///fim pagina login

    // <form method="post" action="/api/auth/callback/credentials">
    //   <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    //   <label>
    //     Username Usuario
    //     <input name="username" type="text" />
    //   </label>
    //   <label>
    //     Senha
    //     <input name="password" type="password" />
    //   </label>
    //   <button type="submit">Sign in</button>
    //   {error?.length > 0 && <h2>Verifique usuário e senha</h2>}
    // </form>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context)
  }
}
*/
