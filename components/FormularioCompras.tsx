import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import Botao from "./Botao";
import useSWR, { useSWRConfig } from "swr";
import api from "../utils/api";
import { useState } from "react";
import NumberFormat from "react-number-format";

export default function FormularioCompras(props) {
  const id = props.compra?._id;
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

  const { data, error } = useSWR("/api/fornecedor", api);

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
    props.compraMudou?.({
      // valor: parseFloat(values.valor.replace(/\,/g, ".")),

      valor: parseFloat(
        values.valor.toString().replace(/\./g, "").replace(",", ".")
      ),
      //valor: values.valor,
      nf: values.nf,
      fornecedor: values.fornecedor,
      id: values.id,
      data_compra: values.data_compra,
    });

    submitProps.setSubmitting(false);
    submitProps.resetForm({});
  };

  return (
    <div>
      <div className="text-center text-lg font-medium ">
        Cadastro de Compras
      </div>

      <Formik
        initialValues={{
          id: props.compra?._id,
          nf: props.compra?.nf,
          valor: props.compra?.valor
            ? (props.compra?.valor).toLocaleString("de-DE")
            : props.compra?.valor,
          // valor: [((props.compra?.valor)) : (props.compra?.valor).toLocaleString("de-DE")?props.compra?.valor)] ,
          // valor: props.compra?.valor,
          // valor: (props.compra?.valor).toLocaleString("de-DE"),
          data_compra: props.compra?.data,
          fornecedor: props.compra?.fornecedor,
        }}
        enableReinitialize={true}
        onSubmit={onSubmit}
        // validate={(values) => {
        //   let errors = {};
        //   if (!values.nf) {
        //     errors.nf = "Preencha a NF";
        //   }
        //   return errors;
        // }}
      >
        <Form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div className="md:flex flex-row md:space-x-4 w-full text-xs">
            <div className=" mb-3 space-y-2 w-full text-xs">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="nf"
              >
                Número NF
              </label>
              <Field
                type="number"
                id="nf"
                name="nf"
                className="border bg-gray-100 py-2 px-4 w-60 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Numero NF"
              />
              <ErrorMessage
                className=" text-red-500"
                name="nf"
                component="div"
              />
            </div>
            <div className=" mb-3 space-y-2 w-full text-xs">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
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

              {/* <Field
                type="float"
                id="valor"
                name="valor"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Valor R$"
              /> */}
              {/* <Field
                type="float"
                id="valor"
                name="valor"
                className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Valor R$"
              /> */}
            </div>
          </div>
          <div className="flex-1 flex flex-row md:space-x-4 w-full text-xs">
            <div className=" mb-3 space-y-2 w-full text-xs">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="fornecedor"
              >
                Fornecedor
              </label>
              <Field
                as="select"
                type="text"
                id="fornecedor"
                name="fornecedor"
                className="rounded border-2 border-gray-200 text-gray-600 h-8 w-60 pl-5 pr-10 bg-gray-100 hover:border-gray-400 focus:outline-none appearance-none"
                placeholder="Fornecedor"
              >
                <option hidden value="">
                  Fornecedor:
                </option>
                {data.data.map((fornecedor) => (
                  <option key={fornecedor._id} value={fornecedor.nome}>
                    {fornecedor.nome}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                className=" text-red-500"
                name="fornecedor"
                component="div"
              />
            </div>
            <div className=" mb-3 space-y-2 w-full text-xs">
              <button
                onClick={function () {
                  campoFornecedor();
                }}
                className={`bg-blue-500 h-10  mt-8 text-white text-sm px-4 py-2 rounded-md`}
              >
                +
              </button>
              {adicionar ? (
                <>
                  <div className="flex flex-col">
                    <div className=" mb-3 space-y-2 w-full text-xs">
                      <label
                        className="mr-4 text-gray-700 font-bold inline-block mb-2"
                        htmlFor="valor"
                      >
                        Fornecedor
                      </label>
                      <Field
                        type="text"
                        id="forn"
                        name="forn"
                        className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                        placeholder="Fornecedor"
                        onChange={(e) => setNome(e.target.value)}
                      />
                      <ErrorMessage
                        className=" text-red-500"
                        name="forn"
                        component="div"
                      />
                    </div>
                  </div>
                  <button
                    onClick={function () {
                      novoFornecedor();
                    }}
                    className={`bg-green-500 h-10  mt-8 text-white text-sm px-4 py-2 rounded-md`}
                  >
                    Salvar
                  </button>
                </>
              ) : (
                false
              )}
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
      </Formik>
    </div>
  );
}
