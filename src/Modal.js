import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, stateValue }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
            <h2>SparQL Query</h2>
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
                {stateValue}
            </pre>
            <div style={{textAlign: 'end'}}>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
      </div>
    );
  };

export default Modal;