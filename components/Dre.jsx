export default function Dre(props) {
  console.log(props.receita);
  return (
    <div>
      <div className="middle-hero-section">
        <div className="hero-section border-b-2  py-2 flex flex-col justify-center ">
          <div className="hero-section-content flex  justify-between  my-1">
            <div className="flex items-center space-x-2">
              <p className="bg-green-500 w-2 h-2 rounded-full"></p>
              <h3 className="font-semibold">Receita Total</h3>
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">
                {props.receita.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
            </div>
          </div>
        </div>
        <div className="hero-section border-b-2  py-2 flex flex-col justify-center ">
          <div className="hero-section-content flex  justify-between  my-1">
            <div className="flex items-center space-x-2">
              <p className="bg-red-500 w-2 h-2 rounded-full"></p>
              <h3 className="font-semibold">Custo de Vendas - CMV</h3>
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">
                {(props.estoque + props.compra - props.estatual).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}
              </h3>
            </div>
          </div>
        </div>
        <div className="hero-section border-b-2  py-2 flex flex-col justify-center ">
          <div className="hero-section-content flex  justify-between  my-1">
            <div className="flex items-center space-x-2">
              <p className="bg-green-500 w-2 h-2 rounded-full"></p>
              <h3 className="font-semibold">Lucro Bruto</h3>
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">
                {(
                  props.receita -
                  (props.estoque + props.compra - props.estatual)
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
            </div>
          </div>
        </div>
        <div className="hero-section border-b-2  py-2 flex flex-col justify-center ">
          <div className="hero-section-content flex  justify-between  my-1">
            <div className="flex items-center space-x-2">
              <p className="bg-red-500 w-2 h-2 rounded-full"></p>
              <h3 className="font-semibold">Custos Fixos - Administrativos </h3>
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">
                {props.fixo.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
            </div>
          </div>
        </div>
        <div className="hero-section border-b-2  py-2 flex flex-col justify-center ">
          <div className="hero-section-content flex  justify-between  my-1">
            <div className="flex items-center space-x-2">
              <p className="bg-green-500 w-2 h-2 rounded-full"></p>
              <h3 className="font-semibold">Resultado - Estoque</h3>
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">
                {(
                  props.receita -
                  (props.estoque + props.compra - props.estatual) -
                  props.fixo
                ).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h3>
            </div>
          </div>
        </div>
        <div className="hero-section border-b-2  py-2 flex flex-col justify-center ">
          <div className="hero-section-content flex  justify-between  my-1">
            <div className="flex items-center space-x-2">
              <p className="bg-blue-500 w-2 h-2 rounded-full"></p>
              <h3 className="font-semibold">Resultado - Financeiro</h3>
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">
                {(props.receita - props.cmvfin - props.fixo).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    // </div>
  );
}
