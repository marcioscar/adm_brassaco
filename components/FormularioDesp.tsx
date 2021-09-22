import Entrada, { Fornecedor, Loja, Tipo } from "./Entrada";
import { useState } from "react";
import Botao from "./Botao";

export default function FormularioDesp(props) {
  const id = props.despesa?._id;
  const [conta, setConta] = useState(props.despesa?.conta ?? "");
  const [valor, setValor] = useState(props.despesa?.valor ?? 0);
  const [descricao, setDescricao] = useState(props.despesa?.descricao ?? "");
  const [fornecedor, setFornecedor] = useState(props.despesa?.fornecedor ?? "");
  const [tipo, setTipo] = useState(props.despesa?.tipo ?? "");
  const [data, setData] = useState(props.despesa?.data ?? "");

  return (
    <div>
      {id ? <Entrada exibir={true} valor={id} /> : false}

      <Entrada texto="Conta" valor={conta} valorMudou={setConta} />
      <Entrada
        texto="Valor"
        valor={valor}
        tipo="number"
        valorMudou={setValor}
      />
      <Entrada texto="Descrição" valor={descricao} valorMudou={setDescricao} />

      <div className="flex gap-14	">
        <Fornecedor
          texto="Fornecedor"
          valor={fornecedor}
          valorMudou={setFornecedor}
        />
        <button
          className={`bg-blue-500 h-10  mt-8 text-white text-sm px-4 py-2 rounded-md`}
        >
          Novo
        </button>
      </div>
      <Tipo texto="Tipo" valor={tipo} valorMudou={setTipo} />

      <Entrada
        texto=""
        read={true}
        valor={data}
        exibir={true}
        valorMudou={setData}
      />
      <div className="flex justify-end gap-2 mt-4">
        <Botao
          cor="green"
          onClick={() =>
            props.despesaMudou?.({
              conta: conta,
              valor: +valor,
              descricao: descricao,
              fornecedor: fornecedor,
              tipo: tipo,
              data_desp: data,
              id: id,
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
