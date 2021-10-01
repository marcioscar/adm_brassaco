import Entrada, { Loja, ContaRec } from "./Entrada";
import { useState } from "react";
import Botao from "./Botao";

export default function Formulario(props) {
  const id = props.receita?._id;
  const [conta, setConta] = useState(props.receita?.conta ?? "");
  const [valor, setValor] = useState(props.receita?.valor ?? 0);
  const [descricao, setDescricao] = useState(props.receita?.descricao ?? "");
  const [loja, setLoja] = useState(props.receita?.loja ?? "");
  const [data, setData] = useState(props.receita?.data ?? "");

  return (
    <div>
      <div className="text-center text-lg font-medium ">
        Cadastro de Receitas
      </div>
      {id ? <Entrada exibir={true} valor={id} /> : false}

      <ContaRec texto="Conta" valor={conta} valorMudou={setConta} />
      <Entrada
        texto="Valor"
        valor={valor}
        tipo="number"
        valorMudou={setValor}
      />
      <Entrada texto="Descrição" valor={descricao} valorMudou={setDescricao} />

      <Loja texto="loja" valor={loja} valorMudou={setLoja} />

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
            props.receitaMudou?.({
              conta: conta,
              valor: +valor,
              descricao: descricao,
              loja: loja,
              data_rec: data,
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
