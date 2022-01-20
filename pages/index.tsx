import Image from "next/image";
import { useEffect, useState } from "react";
import Despesas from "../components/Despesas";
import Receitas from "../components/Receitas";
import logo from "../public/logo_bel.svg";
import Botao from "../components/Botao";
import Formulario from "../components/Formulario";
import useSWR, { useSWRConfig } from "swr";
import api from "../utils/api";
import FormDespesa from "../components/FormDespesa";
import Compras from "../components/Compras";
import Dre from "../components/Dre";
import FormularioCompras from "../components/FormularioCompras";
import FormPreco from "../components/FormPreco";
import Precos from "../components/Precos";
import { signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (status != "loading") {
      if (session) {
        // console.log("session = true");
        router.push("/");
      } else {
        // maybe go to login page
        router.push("/auth/signin");
        //signIn();
      }
    }
  }, [status, session]);

  const [tabelaNome, settabelaNome] = useState("Receitas");
  const [visivel, setVisivel] = useState<"tabela" | "form">("tabela");
  const [receita, SetReceita] = useState({});
  const [despesa, SetDespesa] = useState({});
  const [compra, SetCompra] = useState({});
  const [preco, SetPreco] = useState({});
  const [produto, SetProduto] = useState({});
  const [mes, SetMes] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0")
  );
  const [ano, SetAno] = useState(String(new Date().getFullYear()));

  const { mutate } = useSWRConfig();
  const { data: receitas } = useSWR("/api/receitas", api);
  const { data: despesas } = useSWR("/api/despesas", api);
  const { data: compras } = useSWR("/api/compras", api);
  const { data: estoque } = useSWR("/api/estoque", api);
  const { data: precos } = useSWR("/api/produtos", api);

  if (!receitas) return "Carregando...";
  if (!despesas) return "Carregando...";
  if (!compras) return "Carregando...";
  if (!estoque) return "Carregando...";
  if (!precos) return "Carregando...";

  const estoqueAtual = estoque.data.filter((estoque) =>
    estoque.data.includes(
      // +mes >= 10
      ano + "-" + mes
      // : new Date().getFullYear() + "-" + "0" + +parseInt(mes)
    )
  );

  // const estoqueAnterior = estoque.data.filter((estoque) =>
  //   estoque.data.includes(
  //     +mes > 10
  //       ? new Date().getFullYear() + "-" + (parseInt(mes) - 1)
  //       : new Date().getFullYear() + "-" + "0" + +(parseInt(mes) - 1)
  //   )

  // );

  const estoqueAnterior = estoque.data.filter((estoque) =>
    estoque.data.includes(
      +mes == 10
        ? ano + "-" + (parseInt(mes) - 1)
        : +mes == 11
        ? ano + "-" + (parseInt(mes) - 1)
        : +mes == 12
        ? ano + "-" + (parseInt(mes) - 1)
        : +mes == 1
        ? parseInt(ano) - 1 + "-" + 12
        : ano + "-" + "0" + +(parseInt(mes) - 1)
    )
  );

  const receitaTotal = receitas.data.filter((receitas) =>
    receitas.data.includes(
      // new Date().getFullYear() + "-" + mes
      ano + "-" + mes
      // String(new Date().getMonth() + 1).padStart(2, "0")
    )
  );

  const despesaTotal = despesas?.data.filter((despesas) =>
    despesas.data.includes(
      ano + "-" + mes
      // String(new Date().getMonth() + 1).padStart(2, "0")
    )
  );
  const compraTotal = compras?.data.filter((compras) =>
    compras.data.includes(
      ano + "-" + mes
      // String(new Date().getMonth() + 1).padStart(2, "0")
    )
  );

  const receitaFilterQI = receitas?.data.filter(
    (receitas) =>
      // receitas.loja.includes("QI") && receitas.data.includes("2021-08")
      receitas.loja.includes("QI") &&
      receitas.data.includes(
        ano + "-" + mes
        // String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );

  const receitaFilterQNE = receitas?.data.filter(
    (receitas) =>
      // receitas.loja.includes("QI") && receitas.data.includes("2021-08")
      receitas.loja.includes("QNE") &&
      receitas.data.includes(
        ano + "-" + mes
        // String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );
  const receitaFilterNRT = receitas?.data.filter(
    (receitas) =>
      // receitas.loja.includes("QI") && receitas.data.includes("2021-08")
      receitas.loja.includes("NRT") &&
      receitas.data.includes(
        ano + "-" + mes
        // String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );
  const receitaFilterSDS = receitas.data?.filter(
    (receitas) =>
      // receitas.loja.includes("QI") && receitas.data.includes("2021-08")
      receitas.loja.includes("SDS") &&
      receitas.data.includes(
        ano + "-" + mes
        // String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );

  const despesaFilterPessoal = despesas?.data.filter(
    (despesas) =>
      despesas.conta.includes("Pessoal") &&
      despesas.data.includes(
        ano + "-" + mes
        // String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );
  const despesaFilterRevenda = despesas?.data.filter(
    (despesas) =>
      despesas.conta.includes("Revenda") &&
      despesas.data.includes(
        ano + "-" + mes
        // String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );
  const despesaFilterImpostos = despesas?.data.filter(
    (despesas) =>
      despesas.conta.includes("Imposto") &&
      despesas.data.includes(
        ano + "-" + mes
        // String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );
  const despesaFilterServicos = despesas?.data.filter(
    (despesas) =>
      despesas.conta.includes("Servicos") &&
      despesas.data.includes(
        ano + "-" + mes
        // String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );

  const despesaFilterFixa = despesas?.data.filter(
    (despesas) =>
      despesas.tipo.includes("fixa") &&
      despesas.data.includes(
        ano + "-" + mes
        // String(new Date().getMonth() + 1).padStart(2, "0")
      )
  );

  function soma(rec?) {
    let total = 0;
    for (const receita of rec) {
      total += receita.valor;
    }
    return total;
  }

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

  function produtoSelecionado(precos) {
    SetProduto(precos);
    setVisivel("form");
    console.log(precos.DESCRICAO);
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

  function novoPreco() {
    SetPreco({});
    setVisivel("form");
  }

  const salvarReceita = async (Receita) => {
    const response = await fetch(
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
    response.status === 200
      ? toast.success("Cadastrado com sucesso", {
          position: toast.POSITION.TOP_CENTER,
        })
      : toast.error("Algo deu errado !!!", {
          position: toast.POSITION.TOP_CENTER,
        });
  };
  const salvarDespesa = async (values) => {
    let data = new FormData();
    data.append("file", values.file);
    data.append("id", values.id);
    data.append("conta", values.conta);
    data.append("valor", values.valor);
    data.append("descricao", values.descricao);
    data.append("fornecedor", values.fornecedor);
    data.append("tipo", values.tipo);
    data.append("data", values.data);

    await fetch("/api/comprovantes/s3", {
      method: "post",
      headers: new Headers({
        Accept: "application/json",
      }),
      body: data,
    })
      .then((response) => {
        response.json();
        console.log(response.status);
        toast.success("Cadastrado com sucesso", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao cadastrar !!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    mutate("/api/despesas");
    setVisivel("tabela");
  };

  const salvarCompra = async (Compras) => {
    console.log(Compras);

    const response = await fetch(
      "/api/compras",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(Compras),
      }
    );
    response.status === 200
      ? toast.success("Cadastrado com sucesso", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        })
      : toast.error("Algo deu errado !!!", {
          position: toast.POSITION.TOP_CENTER,
          theme: "colored",
        });
    mutate("/api/compras");
    setVisivel("tabela");
  };

  return (
    <div>
      <main className="">
        {/* {session ? ( */}
        <ToastContainer autoClose={2000} />
        <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 ">
          <div className="grid grid-cols-12 gap-6">
            <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
              <div className="col-span-12 mt-8">
                <div className="flex justify-between items-center  h-10 mb-4 ">
                  <div>
                    <Image width={200} src={logo} alt="Logo Brassaco" />
                  </div>

                  <div>
                    <button
                      onClick={function () {
                        settabelaNome("Precos");
                        mutate("/api/precos");
                      }}
                      className=" bg-green-500 text-white text-sm px-4 py-2 rounded-md mr-8 transform  hover:scale-105 transition duration-300 shadow-md "
                    >
                      Preço de venda
                    </button>
                    <label className="mr-2 font-medium">Mês selecionado:</label>
                    <select
                      className="rounded text-blue-600 h-8 w-60 pl-5 pr-10 hover:border-gray-400 focus:outline-none appearance-none"
                      value={mes}
                      onChange={(e) => SetMes(e.target.value)}
                    >
                      <option hidden={true} value="">
                        Selecione o Mês:
                      </option>
                      <option value="01">Janeiro</option>
                      <option value="02">Fevereiro</option>
                      <option value="03">Março</option>
                      <option value="04">Abril</option>
                      <option value="05">Maio</option>
                      <option value="06">Junho</option>
                      <option value="07">Julho</option>
                      <option value="08">Agosto</option>
                      <option value="09">Setembro</option>
                      <option value="10">Outubro</option>
                      <option value="11">Novembro</option>
                      <option value="12">Dezembro</option>
                    </select>
                    <label className="ml-2 mr-2 font-medium">Ano:</label>
                    <select
                      className="rounded text-blue-600 h-8  w-40 pl-5 pr-10 hover:border-gray-400 focus:outline-none appearance-none"
                      value={ano}
                      onChange={(e) => SetAno(e.target.value)}
                    >
                      <option hidden={true} value="">
                        Selecione o Ano:
                      </option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                    </select>
                    <button
                      className="bg-gray-600 flex-shrink-0 ml-4 text-white text-sm px-4 py-2 rounded-md mr-8 transform  hover:scale-105 transition duration-300 shadow-md "
                      onClick={() => signOut()}
                    >
                      Sair
                    </button>
                  </div>
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
                  <button
                    className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                    onClick={function () {
                      settabelaNome("Dre");
                      // mutate("/api/compras");
                    }}
                  >
                    <div className="p-5">
                      <div className="flex justify-between">
                        <img className="w-8" src="indice.png" />
                        <div className="text-lg font-medium text-gray-700">
                          Resultado
                        </div>

                        <div className="bg-purple-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                          <span className="flex items-center font-mono font-light">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(
                              soma(receitaTotal) -
                                (soma(estoqueAnterior) +
                                  soma(compraTotal) -
                                  soma(estoqueAtual)) -
                                soma(despesaFilterFixa)
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="ml-2 flex justify-between">
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 text-sm tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(
                              soma(receitaTotal) -
                                (soma(estoqueAnterior) +
                                  soma(compraTotal) -
                                  soma(estoqueAtual))
                            )}
                          </div>
                          <div className=" text-sm text-gray-600">M C</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 text-sm tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(
                              soma(receitaTotal) - soma(despesaFilterRevenda)
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            M C financeiro
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3 text-sm tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(soma(despesaFilterRevenda))}
                          </div>
                          <div className="text-sm text-gray-600">
                            CMV Financeiro
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="mt-3  text-sm tracking-tighter leading-8">
                            {new Intl.NumberFormat("pt-BR", {
                              minimumFractionDigits: 2,
                            }).format(
                              soma(receitaTotal) -
                                soma(despesaFilterRevenda) -
                                soma(despesaFilterFixa)
                            )}
                          </div>
                          <div className=" text-sm text-gray-600">
                            Financeiro
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
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
                        {tabelaNome === "Dre" && (
                          <div className="mt-4">
                            <div className="flex flex-col">
                              <div className="-my-2 overflow-x-auto">
                                <div className="py-2 align-middle inline-block min-w-full">
                                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white"></div>
                                  <Dre
                                    receita={soma(receitaTotal)}
                                    estoque={soma(estoqueAnterior)}
                                    compra={soma(compraTotal)}
                                    estatual={soma(estoqueAtual)}
                                    fixo={soma(despesaFilterFixa)}
                                    cmvfin={soma(despesaFilterRevenda)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {tabelaNome === "Precos" && (
                          <div className="mt-4">
                            <div className="flex flex-col">
                              <div className="-my-2 overflow-x-auto">
                                <div className="py-2 align-middle inline-block min-w-full">
                                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white"></div>
                                  <Precos
                                    precos={precos.data}
                                    produtoSelecionado={produtoSelecionado}
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
                          <FormDespesa
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
                        {tabelaNome === "Precos" && (
                          <FormPreco
                            produto={produto}
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
        {/* ) : (
          <div>
            Login
            {router.push("/auth/signin")}
          </div>
          // <button
          //   onClick={() => {
          //     signIn();
          //   }}
          // >
          //   Sign in
          // </button>
        )} */}
      </main>
    </div>
  );
}
