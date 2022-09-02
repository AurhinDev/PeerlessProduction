import React from 'react';
import "./Modal.css";

function Modal(props) {
  return (
    <div className='Modal-backdrop'  onClick={() => props.setConfirmOrder(false)}>

      <div className='modal'>
        <h3>Confirm Order</h3>
        <h4> Index: {props.order}</h4>
        <div className='modal-buttons'>
        <button className="button-5 button-5-confirm" onClick={() => props.setConfirmOrder(false)}> Confirm </button>
        <button className="button-5  button-5-cancel " onClick={() => props.setConfirmOrder(false)}> Cancel </button>
        </div>
      <p>Confirm order is binding. </p>
      </div>
    </div>
  );
}

export default Modal;