import Entrada, { Conta, Fornecedor, Loja, Tipo } from "./Entrada";
import { useState } from "react";
import Botao from "./Botao";
import { useSWRConfig } from "swr";
import Select from "react-select";
import axios from "axios";
import { UiFileInputButton } from "./UiFileInputButton";
export default function FormularioDesp(props) {
  const id = props.despesa?._id;
  const [conta, setConta] = useState(props.despesa?.conta ?? "");
  const [valor, setValor] = useState(props.despesa?.valor ?? 0);
  const [descricao, setDescricao] = useState(props.despesa?.descricao ?? "");
  const [fornecedor, setFornecedor] = useState(props.despesa?.fornecedor ?? "");
  const [tipo, setTipo] = useState(props.despesa?.tipo ?? "");
  const [data, setData] = useState(props.despesa?.data ?? "");
  const [nome, setNome] = useState("");
  const [filename, setFilename] = useState("");
  const [adicionar, setAdicionar] = useState(false);
  const { mutate } = useSWRConfig();

  const contanova = [
    { value: "Revenda", label: "Revenda" },
    { value: "Pessoal", label: "Pessoal" },
    { value: "Servicos", label: "Servicos" },
    { value: "Contador", label: "Contador" },
    { value: "Transporte", label: "Transporte" },
    { value: "Imposto", label: "Imposto" },
    { value: "Comissao", label: "Comissao" },
    { value: "Diversos", label: "Diversos" },
  ];

  function campoFornecedor() {
    setAdicionar(true);
  }

  const onChange = async (formData) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post("/api/comprovantes", formData, config);
    const d = new Date();
    setFilename(
      d.toLocaleDateString("de-DE") + "-" + formData.get("theFiles").name
    );
    console.log("response", response.data);
    // let n = d.toLocaleDateString("de-DE") + "-" + formData.get("theFiles").name;
  };
  console.log(filename);

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

  const [contan, setContan] = useState({ value: conta, label: conta });

  return (
    <div>
      <div className="text-center text-lg font-medium ">
        Cadastro de Despesas
      </div>
      {id ? (
        <div>
          <Select
            className="mb-3"
            placeholder="Selecione a conta:"
            options={contanova}
            isSearchable={true}
            isClearable={true}
            onChange={setContan}
            value={{ value: contan?.value, label: contan?.label }}
          />
        </div>
      ) : (
        <div>
          <Select
            className="mb-3"
            placeholder="Selecione a conta:"
            options={contanova}
            isSearchable={true}
            isClearable={true}
            onChange={setContan}
            // value={{ value: contan?.value, label: contan?.label }}
          />
        </div>
      )}
      {id ? <Entrada exibir={true} valor={id} /> : false}

      <Entrada
        texto="Valor"
        valor={valor}
        tipo="number"
        valorMudou={setValor}
      />
      <Entrada texto="Descrição" valor={descricao} valorMudou={setDescricao} />

      <div className="flex gap-10	">
        <Fornecedor
          texto="Fornecedor"
          valor={fornecedor}
          valorMudou={setFornecedor}
        />
        <button
          onClick={function () {
            campoFornecedor();
          }}
          // onClick={function () {
          //   novoFornecedor();
          // }}
          className={`bg-blue-500 h-10  mt-8 text-white text-sm px-4 py-2 rounded-md`}
        >
          +
        </button>
        {adicionar ? (
          <>
            <div className="flex flex-col">
              <label className="mb-2">Novo</label>
              <input
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
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
      <Tipo texto="Tipo" valor={tipo} valorMudou={setTipo} />

      <Entrada
        texto=""
        read={true}
        valor={data}
        exibir={true}
        valorMudou={setData}
      />
      <div className="flex items-baseline gap-4">
        <UiFileInputButton
          label="Comprovante"
          uploadFileName="theFiles"
          onChange={onChange}
        />
        <p className="text-gray-500 font-light">{filename}</p>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Botao
          cor="green"
          onClick={() =>
            props.despesaMudou?.({
              conta: contan.value,
              valor: +valor,
              descricao: descricao,
              fornecedor: fornecedor,
              tipo: tipo,
              data_desp: data,
              id: id,
              comprovante: filename,
            })
          }
        >
          {id ? "alterar" : "Salvar"}
        </Botao>
        <Botao onClick={props.cancelado} cor="yellow">
          Cancelar
        </Botao>
      </div>
    </div>
  );
}
