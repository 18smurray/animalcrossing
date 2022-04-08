import React, { Component } from 'react'
import './index.css';

function Modal() {
    return (
      <div className="modal">
          <h4>VILLAGER ROSTER IS FULL</h4>
          <div className="modalSubtext">If you want to register this villager, you need to delete a villager from your roster!</div>
      </div>
    )
}

export { Modal };
