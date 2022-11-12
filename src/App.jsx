import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { faPenNib,faUnderline,faStamp,faCalendar,faUser,faUserTag,faEnvelope,faBuilding, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Sign from './components/Sign'
function App() {
  const [isSignActive,setIsSignActive] = useState(false);
  const [coordinates,setCoordinates] = useState({left:0,top:0});

  let hoverHandler = (e) => {
    console.log(e);
    setCoordinates({left:e.clientX,top:e.clientY});
  };

  return (
    <div className="App" >
      <div className='droppables'>
        <div>
          
        </div>
        <ul>
        <h2>FIELDS</h2>
        <hr/>
          <li>
            <div  className='credential' id="sign">
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
        <div className='page' onMouseMove={hoverHandler} onMouseEnter={()=>setIsSignActive(true)} onMouseLeave={()=>setIsSignActive(false)}>

          {isSignActive && <Sign left={coordinates.left-250} top={coordinates.top-120}/>
}
        </div>
      </div>
      
    </div>
  )
}

export default App
