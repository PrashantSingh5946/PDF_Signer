import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import signImage from "./assets/sign.png"
import Sign from "./components/Sign";
import {
  faPenNib,
  faUnderline,
  faStamp,
  faCalendar,
  faUser,
  faUserTag,
  faEnvelope,
  faBuilding,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDrag,useDrop,DragPreviewImage } from "react-dnd";

function App() {
  const [count, setCount] = useState(0);
  const [{ isDragging }, drag,preview] = useDrag(() => ({
    type: "signature",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver, canDrop,  }, drop] = useDrop(
    () => ({
      accept: "signature",
      canDrop: () => true,
      drop: (e) => {console.log(e)},
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [],
  )

  if(isOver)
  {
    alert("Signature dropped")
  }

  

  return (
    <div className="App">
      <DragPreviewImage connect={preview} src={""} />
      <div className="droppables">
        <div></div>
        <ul>
          <h2>FIELDS</h2>
          <hr />
          <li>
            <div className="credential" id="sign" ref={drag}>
              <div className="icon">
                <FontAwesomeIcon icon={faPenNib}></FontAwesomeIcon>
              </div>
              <small>Signature</small>
            </div>
          </li>

          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faUnderline}></FontAwesomeIcon>
              </div>
              <small>Initial</small>
            </div>
          </li>

          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faStamp}></FontAwesomeIcon>
              </div>
              <small>Stamp</small>
            </div>
          </li>

          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
              </div>
              <small>Date Signed</small>
            </div>
          </li>

          <hr />

          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </div>
              <small>Name</small>
            </div>
          </li>

          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faUserTag}></FontAwesomeIcon>
              </div>
              <small>First name</small>
            </div>
          </li>
          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </div>
              <small>Last name</small>
            </div>
          </li>
          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              </div>
              <small>Email</small>
            </div>
          </li>
          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>
              </div>
              <small>Company</small>
            </div>
          </li>
          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>
              </div>
              <small>Title</small>
            </div>
          </li>
        </ul>
      </div>
      <div className="playground">
        <div className="page" ref={drop}>

        </div>
      </div>
    </div>
  );
}

export default App;
