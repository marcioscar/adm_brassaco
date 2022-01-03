import { useState } from "react";

import { IconeSelecao } from "./icones";

export default function Precos(props) {
  const [searchAll, setSearchAll] = useState("");

  const receitaFilter = props.precos?.filter(
    (precos) =>
      precos.DESCRICAO.toLowerCase().includes(searchAll.toLowerCase()) ||
      precos.CODPRODUTO.toString().includes(searchAll.toLowerCase()) ||
      precos.PRECO.toString().includes(searchAll.toLowerCase())
    // receitas.valor.includes(searchAll.toLowerCase())
  );
  function renderizarAcoes(precos) {
    return (
      <td className=" flex py-2 justify-center text-center">
        <button
          onClick={() => props.produtoSelecionado?.(precos)}
          className="flex justify-center items-center text-blue-600 p-2 m-1"
        >
          {IconeSelecao}
        </button>
      </td>
    );
  }

  return (
    <div className="flex flex-col ">
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
          value={searchAll}
          onChange={(e) => setSearchAll(e.target.value)}
          className="mt-4 w-full px-8 py-1  font-thin border-gray-300 border-b focus:outline-none rounded-md"
        />
      </div>
      <div className="mt-4 overflow-y-auto h-96	">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-500 uppercase text-sm leading-normal">
              <th className="py-2 pl-1 text-left">Código</th>
              <th className="py-2 pl-1 text-left">descrição</th>
              <th className="py-2 pl-1 text-left">Compra</th>
              <th className="py-2 pl-1 text-left">Valor</th>
              <th className="py-2 px-2 text-center">Ações</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm font-light">
            {receitaFilter?.map((precos, indice) => (
              <tr
                key={precos._id}
                className={`${indice % 2 != 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="">
                  <div className="flex items-left ">
                    <div className=" py-2  pr-1 text-left whitespace-nowrap">
                      {precos.CODPRODUTO}
                    </div>
                  </div>
                </td>
                <td className="">
                  <div className="flex items-left ">
                    <div className=" w-32 py-2 pr-1 text-left whitespace-nowrap">
                      {precos.DESCRICAO}
                    </div>
                  </div>
                </td>
                <td className="">
                  <div className="flex items-left ">
                    <div className=" py-2 pr-1 text-left whitespace-nowrap">
                      {precos.COMPRA.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                  </div>
                </td>
                <td className="">
                  <div className="flex items-left ">
                    <div className=" py-2 pr-1 text-left whitespace-nowrap">
                      {precos.PRECO.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                  </div>
                </td>

                {renderizarAcoes(precos)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
