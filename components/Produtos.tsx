import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import api from "../utils/api";
import { IconeSelecao } from "./icones";

export default function Produtos(props) {
  const [searchAll, setSearchAll] = useState("");
  const { data, error } = useSWR("/api/produtos", api);

  function renderizarAcoes(produto) {
    return (
      <td className=" flex py-2 justify-center text-center">
        <button
          onClick={() => props.produtoSelecionado?.(produto)}
          className="flex justify-center items-center text-blue-600 "
        >
          {IconeSelecao}
        </button>
      </td>
    );
  }

  if (error) return <div className="text-red-600">Falha ao carregar</div>;
  if (!data)
    return (
      <div className="inline-flex items-center bg-white leading-none text-purple-600 rounded-full p-2 shadow text-teal text-sm">
        <span className="inline-flex bg-verde text-white rounded-full h-6 px-3 justify-center items-center">
          Carregando !!
        </span>
      </div>
    );

  const produtoFilter = data.data?.filter(
    (produto) =>
      produto.DESCRICAO?.toLowerCase().includes(searchAll.toLowerCase()) ||
      produto.CODPROD?.toString().includes(searchAll.toLowerCase())
  );

  return (
    <div className=" border-2 rounded-lg w-6/12">
      <div>
        <span className="absolute p-2 insert-y-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search mt-4"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </span>
        <input
          type="search"
          placeholder="Pesquisa produto"
          value={searchAll}
          onChange={(e) => setSearchAll(e.target.value)}
          className="mt-4 w-full px-8 py-1  font-thin border-gray-300 border-b focus:outline-none rounded-md"
        />
      </div>
      <div className="mt-4 p-1 overflow-y-auto h-20">
        <table className=" table-fixed ">
          <tbody className="text-gray-600 text-sm font-light">
            {produtoFilter.map((produto, indice) => (
              <tr
                key={produto._id}
                className={`${indice % 2 != 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="w-2/8">
                  <div className="flex items-left ">
                    <div className=" py-2  pr-1 text-left">
                      {produto.CODPRODUTO}
                    </div>
                  </div>
                </td>

                <td className=" w-4/8">
                  <div className="flex items-left ">
                    <div className=" py-2 pr-1 text-left ">
                      {produto.DESCRICAO}
                    </div>
                  </div>
                </td>

                <td className="w-2/8">{renderizarAcoes(produto)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
