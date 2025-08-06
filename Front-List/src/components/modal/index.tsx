import "./style.css";
import { useState, useEffect } from "react";

type CallModalProps = {
  text: string;
  initialValue: string;
  onClose: () => void;
  onSave: (value: string) => void;
};

export function CallModal({
  text,
  initialValue,
  onClose,
  onSave,
}: CallModalProps) {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  return (
    <div className="container-modal">
      <div className="modal">
        <h2>{text}</h2>
        <input
          id="txt-input"
          type="text"
          value={inputValue}
          onChange={(e) => {
            const val = e.target.value;
            const capitalized = val.charAt(0).toUpperCase() + val.slice(1);
            setInputValue(capitalized);
          }}
        />
        <div className="container-btn">
          <button onClick={onClose}>Fechar</button>
          <button id="btn-save" onClick={() => onSave(inputValue)}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

type DeleteModalProps = {
  text: string;
  onClose: () => void;
  onDelete: () => void;
};

export function CallDeleteModal({ text, onClose, onDelete }: DeleteModalProps) {
  return (
    <div className="container-modal">
      <div className="modal">
        <h2>{text}</h2>
        <div className="container-btn">
          <button onClick={onClose}>Fechar</button>
          <button id="btn-delete" onClick={onDelete}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
