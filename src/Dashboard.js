import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './index.css';
import {Link} from 'react-router-dom';
import VillageRoster from './VillageRoster.js';

function Dashboard(props) {

    // 391 possible characters
    const TOTAL_IDS = 391;

    const [canidate, setCanidate] = useState({});
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
      
      canidateApproaches();
    }
  
    const skipVillager = () => {
      canidateApproaches();
    }
  
    return (
        <section className='currentCanidate'>
          <h2>Island Visitor</h2>
          <img src={canidate.image_uri} className="profilePic"></img>
          <h3 className='canidateName'>{canidate.name}</h3>
          <div className="btn-group">
            <button className='canidateButton' data-inline="true" onClick={() => skipVillager()}>SKIP</button>
            <button className='canidateButton' data-inline="true" onClick={() => recruitVillager(canidate)}>RECRUIT</button>
          </div>
        </section>
    )
}

export { Dashboard };