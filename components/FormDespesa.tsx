import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import Botao from "./Botao";
import useSWR, { useSWRConfig } from "swr";
import api from "../utils/api";
import { useState } from "react";
import NumberFormat from "react-number-format";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormDespesa(props) {
  const [adicionar, setAdicionar] = useState(false);
  const [nome, setNome] = useState("");
  const { mutate } = useSWRConfig();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [fornecedor, setFornecedor] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
    const response = await fetch(
      "/api/fornecedor",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(fornecedor),
      }
    );
    response.status === 200
      ? toast.success("Cadastrado com sucesso", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
        })
      : toast.error("Algo deu errado !!!", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
        });
    setAdicionar(false);
    setFornecedor("");
    closeModal();
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

  // const handleSubmit = (values, submitProps) => {
  //   let data = new FormData();
  //   data.append("file", values.comprovante);
  //   data.append("id", values.id);
  //   data.append("conta", values.conta);
  //   data.append("valor", values.valor);
  //   data.append("descricao", values.descricao);
  //   data.append("fornecedor", values.fornecedor);
  //   data.append("tipo", values.tipo);
  //   data.append("data", values.data);

  //   return fetch("http://localhost:3000/api/comprovantes/s3", {
  //     method: "post",
  //     headers: new Headers({
  //       Accept: "application/json",
  //     }),
  //     body: data,
  //   })
  //     .then((response) => response.json())
  //     .catch((error) => console.log(error));
  // };

  const onSubmit = async (values, submitProps) => {
    props.despesaMudou?.({
      file: values.comprovante,
      conta: values.conta,
      // valor: parseFloat(
      //   values.valor.toString().replace(/\./g, "").replace(",", ".")
      // ),
      // valor: values.valor,
      valor: parseFloat(
        values.valor.toString().replace(/\./g, "").replace(",", ".")
      ),
      descricao: values.descricao,
      fornecedor: values.fornecedor,
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "auto",
            marginBottom: "auto",
            backgroundColor: "#ededed",
            width: "100%",
            maxWidth: "578px",
            maxHeight: "100%",
            height: "250px",
            align: "center",
            flex: "flex-row",
          },
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="items-center  text-xl font-semibold">
            Cadastro de Fornecedor
          </div>
          <button
            className="  bg-red-500 text-white text-sm px-4 py-2 rounded-md ml-4"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <div className=" mb-3 space-y-2 w-full text-xs">
          <label
            className="mr-2  w-10 text-gray-700 font-bold inline-block mt-4"
            htmlFor="nf"
          >
            Nome:
          </label>

          <input
            className="border rounded-md  border-gray-300 h-8 w-full pl-5 pr-10 bg-gray-100 hover:border-gray-400 focus:outline-none appearance-none"
            type="text"
            placeholder="Fornecedor"
            value={fornecedor}
            onChange={(e) => setFornecedor(e.target.value)}
          />
        </div>
        <div className="flex justify-end ">
          <button
            className="  bg-blue-500 text-white text-sm px-4 py-2 rounded-md mt-4"
            onClick={function () {
              novoFornecedor();
            }}
          >
            Cadastrar
          </button>
        </div>
      </Modal>
      <div className="text-center text-lg font-medium ">
        Cadastro de Despesas
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
        // onSubmit={handleSubmit}
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
                  // text-2xl font-bold rounded border-2 border-purple-700 text-gray-600 h-14 w-60 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none
                  className=" border border-gray-300 h-8 w-96 pl-5 pr-10 bg-gray-100 hover:border-gray-400 focus:outline-none appearance-none"
                  // className="border bg-gray-100 py-2  px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
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
                  {data.data.map((fornecedor) => (
                    <option key={fornecedor._id} value={fornecedor.nome}>
                      {fornecedor.nome}
                    </option>
                  ))}
                </Field>
                <button
                  className="bg-green-500 text-white text-sm px-4 py-2 rounded-md ml-4"
                  onClick={openModal}
                >
                  +
                </button>
              </div>

              <div className=" mb-3 space-y-2 w-full text-xs">
                <label
                  className="mr-4 w-16 text-gray-700 font-bold inline-block mb-2"
                  htmlFor="descricao"
                >
                  Descri????o
                </label>

                <Field
                  type="text"
                  id="descricao"
                  name="descricao"
                  className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                  placeholder="Descri????o"
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
                  <option value="variavel">Vari??vel</option>
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
