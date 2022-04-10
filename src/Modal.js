import React, { Component } from 'react'
import './index.css';

function Modal() {
    return (
      <div className="modal">
          <h4>VILLAGER ROSTER IS FULL</h4>
          <div className="modalSubtext">To register this villager, you must remove a villager from your roster!</div>
      </div>
    )
}

export { Modal };
