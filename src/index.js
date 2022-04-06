import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';


function App() {
  const [roster, setRoster] = useState([]);
  const [canidate, setCanidate] = useState({});

  const ENGLISH = "name-USen"

  useEffect(() => {
    canidateApproaches()
  }, [])
  // Dependencies - when dependency updates, the function is rerun

  const randomVillagerId = () => {
    // 391 villagers
    const min = Math.ceil(1);
    const max = Math.floor(391);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const clarifyName = (data) => {
      data.name = data.name["name-USen"]
  }

  const canidateApproaches = () => {
    axios.get("https://acnhapi.com/v1/villagers/" + randomVillagerId())
    .then(response => {
      const cleanData = clarifyName(response.data)
      setCanidate(response.data);
    })
  }

  const recruitVillager = (villager) => {
    // Append instead of erase state
    setRoster(state => {
      const villagerExists = (state.filter(v => villager.id == v.id).length > 0);
      
      if (!villagerExists) {
        state = [...state, villager]
        state.sort(function (a, b) {
          return a.id - b.id
        })
      }
      return state
    })
    canidateApproaches();
  }

  const skipVillager = () => {
    canidateApproaches();
  }

  const evictVillager = id => {
    // Return all villagers except the one being removed
    setRoster(state => state.filter(v => v.id != id));
  }

  return (
    <div className='app-wrapper'>
      <header>
        <h1 className='title'>React Hooks</h1>
        <h3 className='subtitle'>With Animal Crossing</h3>
      </header>
      <section className='currentCanidate'>
        <h2>Island Visitor</h2>
        <img src={canidate.image_uri} className="profilePic"></img>
        <h3 className='canidateName'>{canidate.name}</h3>
        <button className='recruitButton' onClick={() => recruitVillager(canidate)}>RECRUIT</button>
        <button className='skipButton' onClick={() => skipVillager()}>SKIP</button>
      </section>

      <section className='villagerRoster'>
        <h2>Current Residents</h2>
        <div className='villagerList'>
          {roster.map(villager => (
            <div className="villager" key={villager.id}>
              <img src={villager.image_uri} className="profilePic"></img>
              <h3 className='villagerName'>{villager.name}</h3>
              <button className='remove' onClick={() => evictVillager(villager.id)}>&times;</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


