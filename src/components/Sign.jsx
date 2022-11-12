import React from 'react'
import sign from '../assets/sign.png'
import "./Sign.css"

export default function (props) {
    console.log(props);
  return (
    <div>
        <img src={sign} style={{left:parseInt(props.left), top:parseInt(props.top)}}></img>
    </div>
  )
}
