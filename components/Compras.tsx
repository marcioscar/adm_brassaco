import Link from "next/link";
import { useState } from "react";

import { IconeEdicao, IconeDelete } from "./icones";

export default function Compras(props) {
  const [searchAll, setSearchAll] = useState("");

  const compraFilter = props.compras?.filter(
    (compras) =>
      compras.fornecedor.toLowerCase().includes(searchAll.toLowerCase()) ||
      compras.nf.toString().includes(searchAll.toLowerCase()) ||
      compras.valor.toString().includes(searchAll.toLowerCase())
  );
  function renderizarAcoes(compras) {
    return (
      <td className=" flex py-2 justify-center text-center">
        <button
          onClick={() => props.compraSelecionada?.(compras)}
          className="flex justify-center items-center text-blue-600 p-2 m-1"
        >
          {IconeEdicao}
        </button>
        <button
          onClick={() => props.compraExcluida?.(compras)}
          className="flex justify-center items-center text-red-600 p-2 m-1"
        >
          {IconeDelete}
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
      <div className="mt-4 overflow-y-auto h-96">
        <table className=" w-full table-auto ">
          <thead>
            <tr className="bg-gray-200 text-gray-500 uppercase text-sm leading-normal">
              <th className="py-2  text-left">NF</th>
              <th className="py-2  text-left">Valor</th>
              <th className="py-2  text-left">Fornecedor</th>
              <th className="py-2  text-left">Data</th>
              <th className="py-2 pl-2 text-center">Ações</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm font-light">
            {compraFilter.map((compras, indice) => (
              <tr
                key={compras._id}
                className={`${indice % 2 != 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="">
                  <div className="flex items-left ">
                    <div className=" py-2  pr-1 text-left whitespace-nowrap">
                      {compras.nf}
                    </div>
                  </div>
                </td>
                <td className="">
                  <div className="flex items-left ">
                    <div className=" py-2 pr-1 text-left whitespace-nowrap">
                      {compras.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                  </div>
                </td>
                <td className="">
                  <div className="flex items-left ">
                    <div className=" py-2 pr-1 text-left whitespace-nowrap">
                      {compras.fornecedor}
                    </div>
                  </div>
                </td>

                <td className="">
                  <div className="flex items-left ">
                    <div className=" py-2 pr-1 text-left whitespace-nowrap">
                      {new Date(compras.data).toLocaleDateString("pt-BR", {
                        timeZone: "UTC",
                      })}
                    </div>
                  </div>
                </td>
                <td>{renderizarAcoes(compras)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
