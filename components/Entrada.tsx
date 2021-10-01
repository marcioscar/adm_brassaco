// import CurrencyInput from "react-currency-masked-input";
import useSWR, { useSWRConfig } from "swr";
import api from "../utils/api";
import Select from "react-select";
import NumberFormat from "react-number-format";

export default function Entrada(props) {
  return (
    <div className="flex flex-col">
      <label className="mb-2">{props.texto}</label>
      <input
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
        type={props.tipo ?? "text"}
        readOnly={props.read}
        value={props.valor}
        onChange={(e) => props.valorMudou?.(e.target.value)}
        hidden={props.exibir}
      />
    </div>
  );
}

export function Loja(props) {
  return (
    <div className="flex flex-col">
      <label className="mb-2">{props.texto}</label>

      <select
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
        value={props.valor}
        onChange={(e) => props.valorMudou?.(e.target.value)}
      >
        <option hidden={true} value="">
          Selecione:
        </option>
        <option value="QI">QI</option>
        <option value="QNE">QNE</option>
        <option value="SDS">SDS</option>
        <option value="NRT">NRT</option>
      </select>
    </div>
  );
}
export function ContaRec(props) {
  return (
    <div className="flex flex-col">
      <label className="mb-2">{props.texto}</label>

      <select
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
        value={props.valor}
        onChange={(e) => props.valorMudou?.(e.target.value)}
      >
        <option hidden={true} value="">
          Selecione:
        </option>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartao">Cartão</option>
        <option value="Boleto">Boleto</option>
        <option value="Transferencia">Transferência</option>
      </select>
    </div>
  );
}
export function Conta(props) {
  return (
    <div className="flex flex-col">
      <label className="mb-2">{props.texto}</label>

      <select
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
        value={props.valor}
        onChange={(e) => props.valorMudou?.(e.target.value)}
      >
        <option hidden={true} value="">
          Selecione:
        </option>
        <option value="Revenda">Revenda</option>
        <option value="Pessoal">Pessoal</option>
        <option value="Comunicacao">Comunicações</option>
        <option value="Contador">Contador</option>
        <option value="Imovel">Imóvel</option>
        <option value="Transporte">Transporte</option>
        <option value="Imposto">Impostos</option>
        <option value="Comissao">Comissão</option>
        <option value="Diversos">Diversos</option>
      </select>
    </div>
  );
}
export function Tipo(props) {
  return (
    <div className="flex flex-col">
      <label className="mb-2">{props.texto}</label>

      <select
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
        value={props.valor}
        onChange={(e) => props.valorMudou?.(e.target.value)}
      >
        <option hidden={true} value="">
          Selecione:
        </option>
        <option value="fixa">Fixa</option>
        <option value="variavel">Variável</option>
      </select>
    </div>
  );
}

export function Fornecedor(props) {
  const { mutate } = useSWRConfig();
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

  return (
    <div className="flex flex-col">
      <label className="mb-2">{props.texto}</label>
      <select
        className="px-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
        value={props.valor}
        onChange={(e) => props.valorMudou?.(e.target.value)}
      >
        <option hidden={true} value="">
          Fornecedor:
        </option>
        {data.data.map((fornecedor) => (
          <option key={fornecedor._id} value={fornecedor.nome}>
            {fornecedor.nome}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FornecedorNovo(props) {
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

  return (
    <div className="flex flex-col">
      <label className="mb-2">{props.texto}</label>
      <Select
        className="px-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
        value={props.valor}
        onChange={(e) => props.valorMudou?.(e.target.value)}
      >
        {data.data.map((fornecedor) => (
          <option key={fornecedor._id} value={fornecedor.nome}>
            {fornecedor.nome}
          </option>
        ))}
      </Select>
    </div>
  );
}

// export function ValorMask(props) {
//   return (
//     <CurrencyInput
//       groupSeparator="."
//       decimalSeparator=","
//       decimalsLimit={2}
//       fixedDecimalLength="2"
//       // intlConfig={{ locale: "pt-BR", currency: "RBL" }}
//       // value={props.valor}
//       onChange={(e) => props.valorMudou?.(e.target.value)}
//       className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-gray-400"
//     />
//   );
// }
