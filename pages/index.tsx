import Image from "next/image";
import { useState } from "react";
import Despesas from "../components/Despesas";
import Receitas from "../components/Receitas";
import logo from "../public/logo_bel.svg";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import useSWR, { useSWRConfig } from "swr";
import api from "../utils/api";
import FormularioDesp from "../components/FormularioDesp";
import Compras from "../components/Compras";
import FormularioCompras from "../components/FormularioCompras";

export default function Home() {
  const [tabelaNome, settabelaNome] = useState("Receitas");
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");
  const [receita, SetReceita] = useState({});
  const [despesa, SetDespesa] = useState({});
  const [compra, SetCompra] = useState({});

  const { mutate } = useSWRConfig();
  const { data: receitas } = useSWR("/api/receitas", api);
  const { data: despesas } = useSWR("/api/despesas", api);
  const { data: compras } = useSWR("/api/compras", api);
  const { data: estoque } = useSWR("/api/estoque", api);

  if (!receitas) return "Carregando...";
  if (!despesas) return "Carregando...";
  if (!compras) return "Carregando...";
  if (!estoque) return "Carregando...";

  const estoqueAtual = estoque.data.filter((estoque) =>
    estoque.data.includes(
      new Date().getFullYear() +
        "-" +
        String(new Date().getMonth() + 1).padStart(2, "0")
    )
  );
  const estoqueAnterior = estoque.data.filter((estoque) =>
    estoque.data.includes(
      new Date().getFullYear() +
        "-" +
        String(new Date().getMonth()).padStart(2, "0")
    )
  );

  const receitaTotal = receitas.data.filter((receitas) =>
    receitas.data.includes(
      new Date().getFullYear() +
        "-" +
        String(new Date().getMonth() + 1).padStart(2, "0")
    )
  );

  const despesaTotal = despesas?.data.filter((despesas) =>
    despesas.data.includes(
      new Date().getFullYear() +
        "-" +
        String(new Date().getMonth() + 1).padStart(2, "0")
    )
  );
  const compraTotal = compras?.data.filter((compras) =>
    compras.data.includes(
      new Date().getFullYear() +
        "-" +
        String(new Date().getMonth() + 1).padStart(2, "0")
    )
  );

  const receitaFilterQI = receitas?.data.filter(
    (receitas) =>
      // receitas.loja.includes("QI") && receitas.data.includes("2021-08")
      receitas.loja.includes("QI") &&
      receitas.data.includes(
        new Date().getFullYear() +
          "-" +
          String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );

  const receitaFilterQNE = receitas?.data.filter(
    (receitas) =>
      // receitas.loja.includes("QI") && receitas.data.includes("2021-08")
      receitas.loja.includes("QNE") &&
      receitas.data.includes(
        new Date().getFullYear() +
          "-" +
          String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );
  const receitaFilterNRT = receitas?.data.filter(
    (receitas) =>
      // receitas.loja.includes("QI") && receitas.data.includes("2021-08")
      receitas.loja.includes("NRT") &&
      receitas.data.includes(
        new Date().getFullYear() +
          "-" +
          String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );
  const receitaFilterSDS = receitas.data?.filter(
    (receitas) =>
      // receitas.loja.includes("QI") && receitas.data.includes("2021-08")
      receitas.loja.includes("SDS") &&
      receitas.data.includes(
        new Date().getFullYear() +
          "-" +
          String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );

  const despesaFilterPessoal = despesas?.data.filter(
    (despesas) =>
      despesas.conta.includes("Pessoal") &&
      despesas.data.includes(
        new Date().getFullYear() +
          "-" +
          String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );
  const despesaFilterRevenda = despesas?.data.filter(
    (despesas) =>
      despesas.conta.includes("Revenda") &&
      despesas.data.includes(
        new Date().getFullYear() +
          "-" +
          String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );
  const despesaFilterImpostos = despesas?.data.filter(
    (despesas) =>
      despesas.conta.includes("Imposto") &&
      despesas.data.includes(
        new Date().getFullYear() +
          "-" +
          String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );
  const despesaFilterServicos = despesas?.data.filter(
    (despesas) =>
      despesas.conta.includes("Servicos") &&
      despesas.data.includes(
        new Date().getFullYear() +
          "-" +
          String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );

  const despesaFilterFixa = despesas?.data.filter(
    (despesas) =>
      despesas.tipo.includes("fixa") &&
      despesas.data.includes(
        new Date().getFullYear() +
          "-" +
          String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );

  function soma(rec?) {
    let total = 0;
    for (const receita of rec) {
      total += receita.valor;
    }
    return total;
  }

  console.log(soma(estoqueAnterior));

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
  const compraExcluida = async (compras) => {
    await fetch(
      "/api/compras",

      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(compras._id),
      }
    );
    mutate("/api/compras");
  };

  function despesaSelecionada(despesas) {
    SetDespesa(despesas);
    setVisivel("form");
    console.log(despesas.conta);
  }

  function compraSelecionada(compras) {
    SetCompra(compras);
    setVisivel("form");
    console.log(compras.fornecedor);
  }

  function novaReceita() {
    SetReceita({});
    setVisivel("form");
  }
  function novaDespesa() {
    SetDespesa({});
    setVisivel("form");
  }
  function novaCompra() {
    SetCompra({});
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
  const salvarCompra = async (Compras) => {
    console.log(Compras);

    await fetch(
      "/api/compras",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(Compras),
      }
    );
    mutate("/api/compras");
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
                    onClick={function () {
                      settabelaNome("Receitas");
                      mutate("/api/receitas");
                    }}
                  >
                    <div className="p-5">
                      <div className="flex justify-between">
                        <img className="w-8" src="receita.png" />
                        <div className="text-lg font-medium text-gray-700">
                          Receitas
                        </div>

                        <div className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center font-mono font-light">
                            {soma(receitaTotal).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="ml-2 flex justify-between">
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 font-medium tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(soma(receitaFilterQI))}
                          </div>
                          <div className=" text-base text-gray-600">QI</div>
                        </div>
                        <div className="flex flex-col justify-center  items-center">
                          <div className="mt-3 font-medium tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(soma(receitaFilterQNE))}
                          </div>
                          <div className="text-base text-gray-600">QNE</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 font-medium  tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(soma(receitaFilterNRT))}
                          </div>
                          <div className="text-base text-gray-600">NRT</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 font-medium tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(soma(receitaFilterSDS))}
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
                          Despesas
                        </div>

                        <div className="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center font-mono font-light">
                            {soma(despesaTotal).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="ml-2 flex justify-between">
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 font-medium tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(soma(despesaFilterPessoal))}
                          </div>
                          <div className=" text-base text-gray-600">
                            Pessoal
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 font-medium tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(soma(despesaFilterRevenda))}
                          </div>
                          <div className="text-base text-gray-600">Revenda</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3  font-medium tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(soma(despesaFilterImpostos))}
                          </div>
                          <div className="text-base text-gray-600">
                            Impostos
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3  font-medium tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(soma(despesaFilterServicos))}
                          </div>
                          <div className=" text-base text-gray-600">
                            Serviços
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                    onClick={function () {
                      settabelaNome("Compras");
                      mutate("/api/compras");
                    }}
                  >
                    <div className="p-5">
                      <div className="flex justify-between">
                        <img className="w-8" src="compras.png" />
                        <div className="text-lg font-medium text-gray-700">
                          Compras
                        </div>

                        <div className="bg-blue-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center font-mono font-light">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(soma(compraTotal))}
                          </span>
                        </div>
                      </div>
                      <div className="ml-2 flex justify-between">
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 text-sm tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(soma(estoqueAtual))}
                          </div>
                          <div className=" text-sm text-gray-600">
                            Estoque Atual
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 text-sm tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(soma(estoqueAnterior))}
                          </div>
                          <div className="text-sm text-gray-600">
                            Estoque Anterior
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 text-sm tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(
                              soma(estoqueAnterior) +
                                soma(compraTotal) -
                                soma(estoqueAtual)
                            )}
                          </div>
                          <div className="text-sm text-gray-600">CMV</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3  text-sm tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(soma(despesaFilterFixa))}
                          </div>
                          <div className=" text-sm text-gray-600">CF</div>
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
                            {tabelaNome === "Receitas" && (
                              <Botao cor="blue" onClick={() => novaReceita()}>
                                Adicionar
                              </Botao>
                            )}
                            {tabelaNome === "Despesas" && (
                              <Botao cor="blue" onClick={() => novaDespesa()}>
                                Adicionar
                              </Botao>
                            )}
                            {tabelaNome === "Compras" && (
                              <Botao cor="blue" onClick={() => novaCompra()}>
                                Adicionar
                              </Botao>
                            )}
                          </div>
                        </div>
                        {/* {unreadMessages.length > 0 && */}
                        {tabelaNome === "Receitas" && (
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
                        )}

                        {tabelaNome === "Despesas" && (
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
                        {tabelaNome === "Compras" && (
                          <div className="mt-4">
                            <div className="flex flex-col">
                              <div className="-my-2 overflow-x-auto">
                                <div className="py-2 align-middle inline-block min-w-full">
                                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white"></div>
                                  <Compras
                                    compras={compras.data}
                                    compraSelecionada={compraSelecionada}
                                    compraExcluida={compraExcluida}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div>
                        {tabelaNome === "Receitas" && (
                          <Formulario
                            receita={receita}
                            receitaMudou={salvarReceita}
                            cancelado={() => setVisivel("tabela")}
                          />
                        )}
                        {tabelaNome === "Despesas" && (
                          <FormularioDesp
                            despesa={despesa}
                            despesaMudou={salvarDespesa}
                            cancelado={() => setVisivel("tabela")}
                          />
                        )}
                        {tabelaNome === "Compras" && (
                          <FormularioCompras
                            compra={compra}
                            compraMudou={salvarCompra}
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
