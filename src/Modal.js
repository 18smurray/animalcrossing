import './index.css';

// Component that becomes visible when user tries to register more than 10 villagers
function Modal() {
    return (
      <div className="modal">
          <h4>VILLAGER ROSTER IS FULL</h4>
          <div className="modalSubtext">
            To register this villager, you must remove a villager from your roster!
            </div>
      </div>
    )
}

export { Modal };
