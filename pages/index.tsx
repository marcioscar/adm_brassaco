import Layout from "../components/Layout";
import Receitas from "../components/Receitas";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-b from-gray-600 to-gray-300 ">
      <Layout titulo="Cadastro de contas">
        <Receitas />
      </Layout>
    </div>
  );
}
