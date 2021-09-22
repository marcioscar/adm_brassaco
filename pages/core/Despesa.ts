export default class Despesa {
  #id: string;
  #conta: string;
  #valor: number;
  #descricao: string;
  #fornecedor: string;
  #tipo: string;
  #data: Date;

  constructor(
    conta: string,
    valor: number,
    descricao: string,
    data: Date,
    fornecedor: string,
    tipo: string,
    id: string = null
  ) {
    this.#conta = conta;
    this.#valor = valor;
    this.#descricao = descricao;
    this.#fornecedor = fornecedor;
    this.#tipo = tipo;
    this.#data = data;
    this.#id = id;
  }

  static vazio() {
    return new Despesa("", 0, "", new Date(), "", "", "");
  }

  get id() {
    return this.#id;
  }

  get conta() {
    return this.#conta;
  }

  get valor() {
    return this.#valor;
  }
  get descricao() {
    return this.#descricao;
  }
  get forencedor() {
    return this.#fornecedor;
  }
  get data() {
    return this.#data;
  }
  get tipo() {
    return this.#tipo;
  }
}
