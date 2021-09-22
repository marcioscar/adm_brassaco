export default function Botao(props) {
  return (
    <button
      onClick={props.onClick}
      className={`bg-${props.cor}-500 text-white text-sm px-4 py-2 rounded-md`}
    >
      {props.children}
    </button>
  );
}
