import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import Botao from "./Botao";
import useSWR, { useSWRConfig } from "swr";
import api from "../utils/api";
import { useState } from "react";
import NumberFormat from "react-number-format";
import Produtos from "./Produtos";

export default function FormPreco(props) {
  const [adicionar, setAdicionar] = useState(false);
  const [nome, setNome] = useState("");
  const { mutate } = useSWRConfig();
  const [produto, SetProduto] = useState("");
  const [compra, SetCompra] = useState("");
  const [lucro, SetLucro] = useState("10");

  function precovenda(compra?, lucro?) {
    var markup = 100 - (32.83 + parseFloat(lucro));
    let venda = compra / markup;

    return venda * 100;
  }

  function lucrocalculado(cmv?, pv?) {
    var lucro = -100 * (cmv / pv) + 67.19;
    return lucro;
  }

  function lucronovo(cmv?, pv?) {
    var lucro = 100 - (cmv / pv) * 100 - 32.83;
    return lucro;
  }

  function mc(pv?, compra?) {
    var mc = pv - compra * 0.0983 - compra;
    var mcp = mc / pv;
    return mcp;
  }

  function mcvalor(pv?, compra?) {
    var mc = pv - compra * 0.0983 - compra;
    return mc;
  }

  console.log("lucro calculado novo " + lucronovo(6.49, 9.45));

  console.log(
    "compra " +
      parseFloat(
        props.produto?.COMPRA.toString().replace(/\./g, "").replace(",", ".")
      )
  );
  console.log(
    "venda " +
      parseFloat(
        props.produto?.PRECO.toString().replace(/\./g, "").replace(",", ".")
      )
  );

  return (
    <div>
      <div className="text-center text-lg font-medium mb-2 ">
        Cálculo de Preço de venda
      </div>

      <div className="w-full flex justify-center items-center">
        <div className="container flex flex-col gap-4 mx-8">
          <div className="bg-gray-100 rounded-lg w-full h-auto py-4 flex flex-row justify-between divide-x divide-solid divide-gray-400">
            <div className="relative flex-1 flex flex-col gap-2 px-4">
              <label className="text-gray-800 font-semibold ">
                {props.produto?.CODPRODUTO} - {props.produto?.DESCRICAO}
              </label>
              <label className="text-green-800 text-4xl font-bold">
                R${" "}
                {props.produto?.PRECO
                  ? (props.produto?.PRECO).toLocaleString("de-DE")
                  : props.produto?.PRECO}
              </label>
              <div
                className={`absolute rounded-md font-semibold text-sm  text-gray-100 p-2 right-4 bottom-0  ${
                  lucrocalculado(
                    parseFloat(
                      props.produto?.COMPRA.toString()
                        .replace(/\./g, "")
                        .replace(",", ".")
                    ),
                    parseFloat(
                      props.produto?.PRECO.toString()
                        .replace(/\./g, "")
                        .replace(",", ".")
                    )
                  ) < 0
                    ? " bg-red-500"
                    : "bg-blue-600"
                }`}
              >
                {lucrocalculado(
                  parseFloat(
                    props.produto?.COMPRA.toString()
                      .replace(/\./g, "")
                      .replace(",", ".")
                  ),
                  parseFloat(
                    props.produto?.PRECO.toString()
                      .replace(/\./g, "")
                      .replace(",", ".")
                  )
                ).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }) + "%"}

                {/* {(
                  parseFloat(
                    props.produto?.PRECO.toString()
                      .replace(/\./g, "")
                      .replace(",", ".")
                  ) /
                    precovenda(
                      parseFloat(
                        props.produto?.COMPRA.toString()
                          .replace(/\./g, "")
                          .replace(",", ".")
                      ),
                      10
                    ) -
                  1
                ).toLocaleString(undefined, {
                  style: "percent",
                  minimumFractionDigits: 2,
                })} */}
              </div>
            </div>
            <div className="relative flex-1 flex flex-col gap-2 px-4">
              <label className="text-gray-800 text-base font-semibold tracking-wider">
                Preço de Compra
              </label>
              <label className="text-green-800 text-4xl font-bold">
                R${" "}
                {props.produto?.COMPRA
                  ? (props.produto?.COMPRA).toLocaleString("de-DE")
                  : props.produto?.COMPRA}
              </label>
              <div className="absolute bg-green-400 rounded-md font-semibold text-xs text-gray-100 p-2 right-4 bottom-0">
                + 5%
              </div>
            </div>
            <div className="relative flex-1 flex flex-col gap-2 px-4">
              <label className="text-gray-800 text-base font-semibold tracking-wider">
                Preço Calculado 10%
              </label>
              <label className="text-green-800 text-4xl font-bold">
                R$
                {new Intl.NumberFormat("pt-BR", {
                  maximumFractionDigits: 2,
                }).format(
                  precovenda(
                    parseFloat(
                      props.produto?.COMPRA.toString()
                        .replace(/\./g, "")
                        .replace(",", ".")
                    ),
                    10
                  )
                )}
              </label>
              <div className="absolute bg-green-400 rounded-md font-semibold text-xs text-black p-2 right-4 bottom-0">
                + 10%
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex container  ml-16 mt-3 mb-3  gap-36">
        <div className="flex flex-col items-start">
          <label
            htmlFor="default"
            className=" mb-1 text-gray-700 select-none font-medium"
          >
            Preço de Compra
          </label>
          <input
            value={compra}
            onChange={(e) => SetCompra(e.target.value)}
            type="text"
            placeholder="Compra"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <div className="flex flex-col items-start">
          <label
            htmlFor="default"
            className="mb-1 text-gray-700 select-none font-medium"
          >
            Lucro
          </label>
          <input
            value={lucro}
            onChange={(e) => SetLucro(e.target.value)}
            type="text"
            placeholder="Lucro"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <div className="flex flex-col items-start">
          <label
            htmlFor="default"
            className="mb-1 text-gray-700 select-none font-medium"
          >
            Preço Novo
          </label>
          <label className="text-blue-800 text-4xl font-bold">
            R$
            {new Intl.NumberFormat("pt-BR", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }).format(
              precovenda(
                parseFloat(
                  compra.toString().replace(/\./g, "").replace(",", ".")
                ),
                parseFloat(
                  lucro.toString().replace(/\./g, "").replace(",", ".")
                )
              )
            )}
          </label>
        </div>
        <div className="flex flex-col items-center">
          <label
            htmlFor="default"
            className="mb-1 text-gray-700 select-none font-medium"
          >
            Margem de Contribuição
          </label>
          <label className="text-blue-800 text-3xl font-bold">
            {new Intl.NumberFormat("pt-BR", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }).format(
              mc(
                parseFloat(
                  props.produto?.PRECO.toString()
                    .replace(/\./g, "")
                    .replace(",", ".")
                ),
                parseFloat(
                  props.produto?.COMPRA.toString()
                    .replace(/\./g, "")
                    .replace(",", ".")
                )
              )
            )}
            % / R$
            {new Intl.NumberFormat("pt-BR", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }).format(
              mcvalor(
                parseFloat(
                  props.produto?.PRECO.toString()
                    .replace(/\./g, "")
                    .replace(",", ".")
                ),
                parseFloat(
                  props.produto?.COMPRA.toString()
                    .replace(/\./g, "")
                    .replace(",", ".")
                )
              )
            )}
          </label>
        </div>
      </div>
      <div className="flex container  ml-16 mt-3 mb-3  gap-36">
        <Botao onClick={props.cancelado} cor="yellow">
          Cancelar
        </Botao>
      </div>
    </div>
  );
}
