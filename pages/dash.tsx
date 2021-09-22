import Image from "next/image";
import { useState } from "react";
import Despesas from "../components/Despesas";
import Receitas from "../components/Receitas";
import logo from "../public/logo_bel.svg";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import useSWR, { useSWRConfig } from "swr";
import api from "../utils/api";
import Receita from "./core/Receita";
import Despesa from "./core/Despesa";
import FormularioDesp from "../components/FormularioDesp";

export default function Dash() {
  const [tabelaNome, settabelaNome] = useState("Receitas");
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");
  const [receita, SetReceita] = useState<Receita>(Receita.vazio());
  const [despesa, SetDespesa] = useState<Despesa>(Despesa.vazio());

  const { mutate } = useSWRConfig();
  const { data: receitas } = useSWR("/api/receitas", api);
  const { data: despesas } = useSWR("/api/despesas", api);

  if (!receitas) return "Carregando...";

  function receitaSelecionada(receitas) {
    SetReceita(receitas);
    setVisivel("form");
    console.log(receitas.conta);
  }
  const receitaExcluida = async (receitas) => {
    await fetch(
      "/api/receitas",

      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(receitas._id),
      }
    );
    mutate("/api/receitas");

    console.log("Excluir:" + receitas._id);
  };

  const despesaExcluida = async (despesas) => {
    await fetch(
      "/api/despesas",

      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(despesas._id),
      }
    );
    mutate("/api/despesas");

    console.log("Excluir:" + despesas._id);
  };

  function despesaSelecionada(despesas) {
    SetDespesa(despesas);
    setVisivel("form");
    console.log(despesas.conta);
  }

  function novaReceita() {
    SetReceita(Receita.vazio());
    setVisivel("form");
  }
  function novaDespesa() {
    SetDespesa(Despesa.vazio());
    setVisivel("form");
  }

  const salvarReceita = async (Receita) => {
    await fetch(
      "/api/receitas",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(Receita),
      }
    );
    mutate("/api/receitas");
    setVisivel("tabela");
  };

  const salvarDespesa = async (Despesa) => {
    await fetch(
      "/api/despesas",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(Despesa),
      }
    );
    mutate("/api/despesas");
    setVisivel("tabela");
  };

  return (
    <div>
      <main className="">
        <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 ">
          <div className="grid grid-cols-12 gap-6">
            <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
              <div className="col-span-12 mt-8">
                <div className="flex items-center h-10 mb-4 ">
                  <Image width={200} src={logo} alt="Logo Brassaco" />
                </div>
                <div className="grid grid-cols-12 gap-6 mt-5">
                  <button
                    className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                    // onClick={changeTable}
                    onClick={function () {
                      settabelaNome("Receitas");
                      mutate("/api/receitas");
                    }}
                  >
                    <div className="p-5">
                      <div className="flex justify-between">
                        <img className="w-8" src="receita.png" />
                        <div className="text-lg font-medium text-gray-700">
                          Receita Total
                        </div>

                        <div className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center font-mono font-light">
                            456.900,34
                          </span>
                        </div>
                      </div>
                      <div className="ml-2 flex justify-between">
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 font-medium tracking-tighter leading-8">
                            114.510,56
                          </div>
                          <div className=" text-base text-gray-600">QI</div>
                        </div>
                        <div className="flex flex-col justify-center  items-center">
                          <div className="mt-3 font-medium tracking-tighter leading-8">
                            24.510,55
                          </div>
                          <div className="text-base text-gray-600">QNE</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 font-medium  tracking-tighter leading-8">
                            24.510,43
                          </div>
                          <div className="text-base text-gray-600">NRT</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 font-medium tracking-tighter leading-8">
                            24.510,23
                          </div>
                          <div className=" text-base text-gray-600">SDS</div>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                    onClick={function () {
                      settabelaNome("Despesas");
                      mutate("/api/despesas");
                    }}
                  >
                    <div className="p-5">
                      <div className="flex justify-between">
                        <img className="w-8" src="despesas.png" />
                        <div className="text-lg font-medium text-gray-700">
                          Despesa Total
                        </div>

                        <div className="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center font-mono font-light">
                            235.555,00
                          </span>
                        </div>
                      </div>
                      <div className="ml-2 flex justify-between">
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 font-medium tracking-tighter leading-8">
                            114.510
                          </div>
                          <div className=" text-base text-gray-600">QI</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 font-medium tracking-tighter leading-8">
                            24.510
                          </div>
                          <div className="text-base text-gray-600">QNE</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3  font-medium tracking-tighter leading-8">
                            24.510
                          </div>
                          <div className="text-base text-gray-600">NRT</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3  font-medium tracking-tighter leading-8">
                            24.510
                          </div>
                          <div className=" text-base text-gray-600">SDS</div>
                        </div>
                      </div>
                    </div>
                  </button>
                  <a
                    className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                    href="#"
                  >
                    <div className="p-5">
                      <div className="flex justify-between">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-pink-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                          />
                        </svg>
                        <div className="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center">30%</span>
                        </div>
                      </div>
                      <div className="ml-2 w-full flex-1">
                        <div>
                          <div className="mt-3 text-3xl font-bold leading-8">
                            4.510
                          </div>

                          <div className="mt-1 text-base text-gray-600">
                            Item Sales
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  <a
                    className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                    href="#"
                  >
                    <div className="p-5">
                      <div className="flex justify-between">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                          />
                        </svg>
                        <div className="bg-blue-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center">30%</span>
                        </div>
                      </div>
                      <div className="ml-2 w-full flex-1">
                        <div>
                          <div className="mt-3 text-3xl font-bold leading-8">
                            4.510
                          </div>

                          <div className="mt-1 text-base text-gray-600">
                            Item Sales
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-span-12 mt-5">
                <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
                  <div className="bg-white p-4 shadow-lg rounded-lg">
                    {visivel === "tabela" ? (
                      <>
                        <div className=" flex items-center font-bold text-lg gap-8">
                          <div>{tabelaNome}</div>
                          <div>
                            {tabelaNome === "Receitas" ? (
                              <Botao cor="blue" onClick={() => novaReceita()}>
                                Adicionar
                              </Botao>
                            ) : (
                              <Botao cor="blue" onClick={() => novaDespesa()}>
                                Adicionar
                              </Botao>
                            )}
                          </div>
                        </div>
                        {tabelaNome === "Receitas" ? (
                          <div className="mt-4">
                            <div className="flex flex-col">
                              <div className="-my-2 overflow-x-auto">
                                <div className="py-2 align-middle inline-block min-w-full">
                                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white"></div>
                                  <Receitas
                                    receitas={receitas.data}
                                    receitaSelecionada={receitaSelecionada}
                                    receitaExcluida={receitaExcluida}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4">
                            <div className="flex flex-col">
                              <div className="-my-2 overflow-x-auto">
                                <div className="py-2 align-middle inline-block min-w-full">
                                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white"></div>
                                  <Despesas
                                    despesas={despesas.data}
                                    despesaSelecionada={despesaSelecionada}
                                    despesaExcluida={despesaExcluida}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div>
                        {tabelaNome === "Receitas" ? (
                          <Formulario
                            receita={receita}
                            receitaMudou={salvarReceita}
                            cancelado={() => setVisivel("tabela")}
                          />
                        ) : (
                          <FormularioDesp
                            despesa={despesa}
                            despesaMudou={salvarDespesa}
                            cancelado={() => setVisivel("tabela")}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
