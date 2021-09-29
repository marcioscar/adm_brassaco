export default class Compra {
  #id: string;
  #nf: number;
  #valor: number;
  #fornecedor: string;
  #data: Date;

  constructor(
    valor: number,
    nf: number,
    data: Date,
    fornecedor: string,
    id: string = null
  ) {
    this.#nf = nf;
    this.#valor = valor;
    this.#fornecedor = fornecedor;
    this.#data = data;
    this.#id = id;
  }

  static vazio() {
    return new Compra(null, null, new Date(), "", "");
  }

  get id() {
    return this.#id;
  }

  get nf() {
    return this.#nf;
  }

  get valor() {
    return this.#valor;
  }

  get fornecedor() {
    return this.#fornecedor;
  }
  get data() {
    return this.#data;
  }
}
