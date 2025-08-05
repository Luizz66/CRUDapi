import "./style.css";

type ModalProps = {
  text: string;
  value?: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ text, value, onClose }) => {
  if (value != undefined) {
    return (
      <div className="container-modal">
        <div className="modal">
          <h2>{text}</h2>
          <input id="txt-input" type="text" value={value} />
          <div className="container-btn">
            <button onClick={onClose}>Fechar</button>
            <button id="btn-save">Salvar</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-modal">
        <div className="modal">
          <h2>{text}</h2>
          <div className="container-btn">
            <button onClick={onClose}>Fechar</button>
            <button id="btn-delete">Excluir</button>
          </div>
        </div>
      </div>
    );
  }
};

export function CallModal(text: string, value: string, onClose: () => void) {
  return <Modal text={text} value={value} onClose={onClose} />;
}
