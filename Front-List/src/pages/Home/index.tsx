import "./style.css";
import {
  IoCreateOutline,
  IoCloseOutline,
  IoPencilOutline,
  IoAddOutline,
} from "react-icons/io5";
import { useState, useEffect } from "react";
import { CallModal } from "../../components/modal";
import { getPerson, type Person } from "../../services/service";
import { getTitle, type Title } from "../../services/service";

function Home() {
  const [person, setPerson] = useState<Person | Person[] | null>(null);
  const personRender = Array.isArray(person) ? person : person ? [person] : [];

  const [title, setTitle] = useState<Title | Title[] | null>(null);
  const titlesRender = Array.isArray(title) ? title : title ? [title] : [];

  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    getPerson()
      .then(setPerson)
      .catch((error) => setErro("Erro ao carregar usuários" + error.message));
  }, []);

  useEffect(() => {
    getTitle()
      .then(setTitle)
      .catch((error) => setErro("Erro ao carregar título: " + error.message));
  }, []);

  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalValue, setModalValue] = useState("");

  const openModal = (text: string, value: string) => {
    setModalText(text);
    setModalValue(value);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="main-container">
      <div className="home-container">
        {titlesRender.map((tit) => (
          <div className="title-container">
            <h1 className="title">{tit.title}</h1>
            <button onClick={() => openModal("Editar Titulo", tit.title)}>
              <IoCreateOutline id="icon" />
            </button>
          </div>
        ))}

        <div className="list-container">
          <ul className="list">
            <button onClick={() => openModal("Adicionar", "")}>
              <IoAddOutline id="io-add" />
            </button>

            {personRender.map((per) => (
              <li className="list-item" key={per.id}>
                <span>{per.name}</span>
                <span>
                  <button onClick={() => openModal("Editar", per.name)}>
                    <IoPencilOutline id="io-up" />
                  </button>
                  <button onClick={() => openModal("Tem Certeza?", undefined!)}>
                    <IoCloseOutline id="io-del" />
                  </button>
                </span>
              </li>
            ))}
            {modal && CallModal(modalText, modalValue, closeModal)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
