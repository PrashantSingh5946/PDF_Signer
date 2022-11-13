import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { faPenNib,faUnderline,faStamp,faCalendar,faUser,faUserTag,faEnvelope,faBuilding, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sign from './components/Sign'
function App() {
  const [droppables,setDroppables] = useState([]);
  const [isSignActive,setIsSignActive] = useState(false);
  const [isSignVisible,setIsSignVisible] = useState(false);
  const [coordinates,setCoordinates] = useState({left:0,top:0});

  let hoverHandler = (e) => {
    setCoordinates({left:e.clientX,top:e.clientY});
  };

  let pasteHandler = (e) => {
    console.log(e);
    setIsSignActive(false);
    setDroppables([...droppables,{name:"signature"+Math.random(),left:coordinates.left-250,top: coordinates.top-120}])
  }

  return (
    <div className="App" >
      <div className='droppables'>
        <div>
          
        </div>
        <ul>
        <h2>FIELDS</h2>
        <hr/>
          <li draggable>
            <div  className='credential' id="sign" onClick={()=>setIsSignActive(true)}>
              <div className='icon'>
                <FontAwesomeIcon icon={faPenNib}></FontAwesomeIcon>
              </div>
              <small>Signature</small>

            </div>
          </li>
          

          <li>
            <div  className='credential' id="sign">
              <div className='icon'>
                <FontAwesomeIcon icon={faUnderline}></FontAwesomeIcon>
              </div>
              <small>Initial</small>

            </div>
          </li>


          <li>
            <div  className='credential' id="sign">
              <div className='icon'>
                <FontAwesomeIcon icon={faStamp}></FontAwesomeIcon>
              </div>
              <small>Stamp</small>

            </div>
          </li>


          <li>
            <div  className='credential' id="sign">
              <div className='icon'>
                <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
              </div>
              <small>Date Signed</small>

            </div>
          </li>

          <hr/>

          <li>
            <div  className='credential' id="sign">
              <div className='icon'>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </div>
              <small>Name</small>

            </div>
          </li>

          <li>
            <div  className='credential' id="sign">
              <div className='icon'>
                <FontAwesomeIcon icon={faUserTag}></FontAwesomeIcon>
              </div>
              <small>First name</small>

            </div>
          </li>
          <li>
            <div  className='credential' id="sign">
              <div className='icon'>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </div>
              <small>Last name</small>

            </div>
          </li>
          <li>
            <div  className='credential' id="sign">
              <div className='icon'>
                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              </div>
              <small>Email</small>

            </div>
          </li>
          <li>
            <div  className='credential' id="sign">
              <div className='icon'>
                <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>
              </div>
              <small>Company</small>

            </div>
          </li>
          <li>
            <div  className='credential' id="sign">
              <div className='icon'>
                <FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>
              </div>
              <small>Title</small>

            </div>
          </li>
        </ul>
      </div>
      <div className='playground'>
        <div className='page' onClick={pasteHandler} onMouseMove={hoverHandler} onMouseEnter={()=>setIsSignVisible(true)} onMouseLeave={()=>setIsSignVisible(false)}>

{
  droppables.map((droppable)=> <Sign left={droppable.left} top={droppable.top}/>)
}
          {isSignActive && isSignVisible && <Sign left={coordinates.left-250} top={coordinates.top-120}/>
}
        </div>
      </div>
      
    </div>
  )
}

export default App
