export default class Receita {
  #id: string;
  #conta: string;
  #valor: number;
  #descricao: string;
  #loja: string;
  #data: Date;

  constructor(
    conta: string,
    valor: number,
    descricao: string,
    loja: string,
    data: Date,
    id: string = null
  ) {
    this.#conta = conta;
    this.#valor = valor;
    this.#descricao = descricao;
    this.#loja = loja;
    this.#data = data;
    this.#id = id;
  }

  static vazio() {
    return new Receita("", 0, "", "", new Date(), "");
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
  get loja() {
    return this.#loja;
  }
  get data() {
    return this.#data;
  }
}
