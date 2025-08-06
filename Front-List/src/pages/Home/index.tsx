import "./style.css";
import {
  IoCreateOutline,
  IoCloseOutline,
  IoPencilOutline,
  IoAddOutline,
} from "react-icons/io5";
import { useState, useEffect } from "react";
import { CallModal, CallDeleteModal } from "../../components/modal";
import {
  deletePerson,
  getPerson,
  postPerson,
  putPerson,
  putTitle,
  type Person,
  getTitle,
  type Title,
} from "../../services/api";

function Home() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [titles, setTitles] = useState<Title[]>([]);

  const [editPersonId, setEditPersonId] = useState<number | null>(null);
  const [deletePersonId, setDeletePersonId] = useState<number | null>(null);
  const [editTitleId, setEditTitleId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalValue, setModalValue] = useState("");

  useEffect(() => {
    fetchPerson();
    // fetchTitle();
    getTitle()
      .then((data) =>
        setTitles(Array.isArray(data) ? data : data ? [data] : [])
      )
      .catch((error) => console.error("Erro ao carregar título:", error));
  }, []);

  const fetchPerson = async () => {
    const res = await getPerson();
    if (res && res.length > 0) {
      setPersons(res);
    }
  };

  const fetchTitle = async () => {
    const res = await getTitle();
    if (res && res.length > 0) {
      setTitles(res);
    }
  };

  const openModal = (text: string, value: string) => {
    setModalText(text);
    setModalValue(value);
    setModal(true);
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalText, setDeleteModalText] = useState("");

  const openDeleteModal = (text: string) => {
    setDeleteModalText(text);
    setDeleteModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setDeleteModal(false);
  };

  const handleSavePerson = async (text: string) => {
    if (editPersonId === null) {
      await postPerson({ name: text });
      const updatedPersons = await getPerson();
      setPersons(updatedPersons);
    } else {
      const updated = await putPerson(editPersonId, { name: text });
      setPersons((prev) =>
        prev.map((p) => (p.id === editPersonId ? updated : p))
      );
    }
    closeModal();
  };

  const handleSaveTitle = async (titleText: string) => {
    if (editTitleId !== null) {
      const updated = await putTitle(editTitleId, { title: titleText });
      setTitles((prev) =>
        prev.map((t) => (t.id === editTitleId ? updated : t))
      );
    }
    closeModal();
  };

  const handleSave = (text: string) => {
    if (editTitleId !== null) {
      handleSaveTitle(text);
    } else {
      handleSavePerson(text);
    }
  };

  const handleDelete = async () => {
    if (deletePersonId !== null) {
      await deletePerson(deletePersonId);
      setPersons((prev) => prev.filter((p) => p.id !== deletePersonId));
    }
    closeModal();
  };

  return (
    <div className="main-container">
      <div className="home-container">
        {titles.map((tit) => (
          <div className="title-container" key={tit.id}>
            <h1 className="title">{tit.title}</h1>
            <button
              onClick={() => {
                setEditTitleId(tit.id);
                openModal("Editar Título", tit.title);
              }}
            >
              <IoCreateOutline id="icon" />
            </button>
          </div>
        ))}

        <div className="list-container">
          <ul className="list">
            <button
              onClick={() => {
                setEditPersonId(null);
                setEditTitleId(null);
                openModal("Adicionar", "");
              }}
            >
              <IoAddOutline id="io-add" />
            </button>

            {persons && persons.length > 0
              ? persons.map((per) => (
                  <li className="list-item" key={per.id}>
                    <span>{per.name}</span>
                    <span>
                      <button
                        onClick={() => {
                          setEditPersonId(per.id);
                          setEditTitleId(null);
                          openModal("Editar", per.name);
                        }}
                      >
                        <IoPencilOutline id="io-up" />
                      </button>
                      <button
                        onClick={() => {
                          setDeletePersonId(per.id);
                          openDeleteModal("Tem certeza?");
                        }}
                      >
                        <IoCloseOutline id="io-del" />
                      </button>
                    </span>
                  </li>
                ))
              : "Nenhum item adicionado."}

            {modal && (
              <CallModal
                text={modalText}
                initialValue={modalValue}
                onClose={closeModal}
                onSave={handleSave}
              />
            )}
            {deleteModal && (
              <CallDeleteModal
                text={deleteModalText}
                onClose={closeModal}
                onDelete={handleDelete}
              />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
