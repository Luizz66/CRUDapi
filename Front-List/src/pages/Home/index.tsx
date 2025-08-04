import "./style.css";
import {
  IoCreateOutline,
  IoCloseOutline,
  IoPencilOutline,
} from "react-icons/io5";

function Home() {
  const people = [
    {
      name: "Gabriel",
    },
    {
      name: "Lucas",
    },
    {
      name: "Luizao",
    },
  ];

  return (
    <div className="main-container">
      <div className="home-container">
        <div className="title-container">
          <h1 className="title">Minha Lista</h1>
          <IoCreateOutline id="icon" />
        </div>
        <div className="list-container">
          <ul className="list">
            <li className="list-item">
              <span>1 Item</span>
              <span>
                <IoPencilOutline id="io-up" />
                <IoCloseOutline id="io-del" />
              </span>
            </li>
            <li className="list-item">
              <span>2 Item</span>
              <span>
                <IoPencilOutline id="io-up" />
                <IoCloseOutline id="io-del" />
              </span>
            </li>
            <li className="list-item">
              <span>3 Item</span>
              <span>
                <IoPencilOutline id="io-up" />
                <IoCloseOutline id="io-del" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
