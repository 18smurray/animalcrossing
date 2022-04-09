import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './index.css';
import { Modal } from './Modal';
import spinner from './spinner.gif';

function Dashboard(props) {

    // 391 possible characters
    const TOTAL_IDS = 391;

    const [canidate, setCanidate] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);
    const {roster, setRoster} = props;
    const {usedIds, setUsedIds} = props;

    useEffect(() => {
      canidateApproaches()
    }, [])
    // Dependencies - when dependency updates, the function is rerun
    // If no dependencies, runs once when rendered
  
    const randomVillagerId = () => {

        // Generate random id number
        let min = Math.ceil(1);
        let max = Math.floor(TOTAL_IDS);
        let randomId =  Math.floor(Math.random() * (max - min + 1)) + min;  

        // Ensure villager isn't already in roster (id isn't already used)
        while (usedIds.includes(randomId)){
            min = Math.ceil(1);
            max = Math.floor(TOTAL_IDS);
            randomId =  Math.floor(Math.random() * (max - min + 1)) + min;  
        }
        return randomId;
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

      if (roster.length < 10) {
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
        });
        setUsedIds([...usedIds, villager.id]);
        setShowModal(false);
        canidateApproaches();
      }
      else {
        setShowModal(true);
      }
    }
  
    const skipVillager = () => {
      canidateApproaches();
    }
  
    return (
        <section className='currentCanidate'>
          <h2>Island Visitor</h2>
          <div className="images">
          <img 
            src={canidate.image_uri} 
            className="profilePic"
            onLoad={() => setImageLoading(false)}
          />
 
          {imageLoading ? (
            <img src={spinner} className="spinner"></img>
          ) : null}
          </div>
          <h3 className='canidateName'>{canidate.name}</h3>
          { showModal &&
            (<Modal />)
          }
          <div className="btn-group">
            <button className='canidateButton' data-inline="true" onClick={() => skipVillager()}>SKIP</button>
            <button className='canidateButton' data-inline="true" onClick={() => recruitVillager(canidate)}>RECRUIT</button>
          </div>
        </section>
    )
}

export { Dashboard };