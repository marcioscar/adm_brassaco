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

  function MoneyInput(props) {
    const { name } = props;
    const [field] = useField(name);
    let floatValue = 0;

    return (
      <NumberFormat
        className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
        {...field}
        decimalSeparator=","
        thousandSeparator="."
        displayType="input"
        type="text"
        decimalScale={2}
        allowNegative={false}
      />
    );
  }

  function campoFornecedor() {
    setAdicionar(true);
  }

  const novoFornecedor = async () => {
    // console.log(nome);
    await fetch(
      "/api/fornecedor",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(nome),
      }
    );
    setAdicionar(false);
    setNome("");
    mutate("/api/fornecedor");
  };

  const { data, error } = useSWR("/api/produtos", api);

  if (error) return <div className="text-red-600">Falha ao carregar</div>;
  if (!data)
    return (
      <div className="inline-flex items-center bg-white leading-none text-purple-600 rounded-full p-2 shadow text-teal text-sm">
        <span className="inline-flex bg-verde text-white rounded-full h-6 px-3 justify-center items-center">
          Carregando
        </span>
      </div>
    );

  const onSubmit = async (values, submitProps) => {
    props.despesaMudou?.({
      file: values.comprovante,
      conta: values.conta,
      valor: parseFloat(
        values.valor.toString().replace(/\./g, "").replace(",", ".")
      ),
      descricao: values.descricao,
      fornecedor: values.produto,
      id: values.id ?? Math.floor(Math.random() * 900000000000),
      tipo: values.tipo,
      data: values.data,
    });
    console.log("onsubmit" + values.comprovante);
    submitProps.setSubmitting(false);
    submitProps.resetForm({});
  };

  return (
    <div>
      <div className="text-center text-lg font-medium mb-2 ">
        Cálculo de Preço de venda
      </div>

      <div className="flex flex-col place-items-center ">
        <Produtos />
      </div>

      <Formik
        initialValues={{
          id: props.despesa?._id,
          conta: props.despesa?.conta,
          valor: props.despesa?.valor
            ? (props.despesa?.valor).toLocaleString("de-DE")
            : props.despesa?.valor,
          descricao: props.despesa?.descricao,
          fornecedor: props.despesa?.fornecedor,
          tipo: props.despesa?.tipo,
          data: props.despesa?.data,
          comprovante: "",
        }}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {(formProps) => (
          <Form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
            <div className="md:flex flex-row md:space-x-4 w-full text-xs">
              <div className=" mb-3 space-y-2 w-full text-xs">
                <label
                  className="mr-4 w-16 text-gray-700 font-bold inline-block mb-2"
                  htmlFor="nf"
                >
                  Conta
                </label>

                <Field
                  as="select"
                  type="text"
                  id="conta"
                  name="conta"
                  className=" border border-gray-300 h-8 w-96 pl-5 pr-10 bg-gray-100 hover:border-gray-400 focus:outline-none appearance-none"
                  placeholder="Conta"
                >
                  <option hidden value="">
                    Conta:
                  </option>
                  <option value="Revenda">Revenda</option>
                  <option value="Pessoal">Pessoal</option>
                  <option value="Servicos">Servicos</option>
                  <option value="Contador">Contador</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Imposto">Imposto</option>
                  <option value="Comissao">Comissao</option>
                  <option value="Diversos">Diversos</option>
                </Field>
              </div>
              <div className=" mb-3 space-y-2 w-full text-xs">
                <label
                  className="mr-4 w-16 text-gray-700 font-bold inline-block mb-2"
                  htmlFor="valor"
                >
                  Valor
                </label>

                <Field
                  className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                  name="valor"
                  id="valor"
                  type="text"
                  placeholder="Valor"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-row md:space-x-4 w-full text-xs">
              <div className=" mb-3 space-y-2 w-full text-xs">
                <label
                  className="mr-4 w-16 text-gray-700 font-bold inline-block mb-2"
                  htmlFor="fornecedor"
                >
                  Fornecedor
                </label>
                <Field
                  as="select"
                  type="text"
                  id="fornecedor"
                  name="fornecedor"
                  className="border border-gray-300 h-8 w-96 pl-5 pr-10 bg-gray-100 hover:border-gray-400 focus:outline-none appearance-none"
                  placeholder="Fornecedor"
                >
                  <option hidden value="">
                    Fornecedor:
                  </option>
                  {data.data.map((produtos) => (
                    <option key={produtos._id} value={produtos.DESCRICAO}>
                      {produtos.DESCRICAO}
                    </option>
                  ))}
                </Field>
              </div>
              <div className=" mb-3 space-y-2 w-full text-xs">
                <label
                  className="mr-4 w-16 text-gray-700 font-bold inline-block mb-2"
                  htmlFor="descricao"
                >
                  Descrição
                </label>

                <Field
                  type="text"
                  id="descricao"
                  name="descricao"
                  className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                  placeholder="Descrição"
                />
              </div>
            </div>
            <div className="md:flex flex-row md:space-x-4 w-full text-xs">
              <div className=" mb-3 space-y-2 w-full text-xs">
                <label
                  className="mr-4 w-16 text-gray-700 font-bold inline-block mb-2"
                  htmlFor="tipo"
                >
                  Tipo
                </label>

                <Field
                  as="select"
                  type="text"
                  id="tipo"
                  name="tipo"
                  className="border border-gray-300 h-8 w-96 pl-5 pr-10 bg-gray-100 hover:border-gray-400 focus:outline-none appearance-none"
                  placeholder="Conta"
                >
                  <option hidden value="">
                    Tipo:
                  </option>
                  <option value="fixa">Fixa</option>
                  <option value="variavel">Variável</option>
                </Field>
              </div>
              <div className=" mb-3 space-y-2 w-full text-xs">
                <label
                  className="mr-4 w-16 text-gray-700 font-bold inline-block mb-2"
                  htmlFor="comprovante"
                >
                  Comprovante
                </label>

                <Field
                  as="input"
                  type="file"
                  id="file"
                  name="file"
                  onChange={(event) => {
                    formProps.setFieldValue(
                      "comprovante",
                      event.target.files[0]
                    );
                  }}
                  className="px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md"
              >
                Cadastrar
              </button>
              <Botao onClick={props.cancelado} cor="yellow">
                Cancelar
              </Botao>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
