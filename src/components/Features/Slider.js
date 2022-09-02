import React, { useState } from 'react';
import "./Slider.css"
function Slider(props) {
  const background1 = props.background1;
  const background2 = props.background2;
  const value1 = props.value1;
  const value2 = props.value2;
  const [position, setPosition] = useState(0)
  const [selectorLeftPos, setSelectorLeftPos] = useState("0%")
  const [selectorColor, setSelectorColor] = useState(background1)
 
  return (
    <div className='Slider-container noselect' style={{width: props.width}}>
      <div className='Slider-bar'>
        <div onClick={() =>{ props.state(true); setPosition(0); setSelectorLeftPos("0%"); setSelectorColor(background1)}} className='Slider-bar-item'><span>{value1}</span></div>
        <div onClick={() =>{props.state(false); setPosition(1); setSelectorLeftPos("50%"); setSelectorColor(background2)}} className='Slider-bar-item'><span>{value2}</span></div>
        <div className='Slider-selector' style={{left: selectorLeftPos, background:selectorColor}}>
          {position === 0? <span>{value1}</span>: <span>{value2}</span>}
        </div>
      </div>
    </div>
  );
}

export default Slider;