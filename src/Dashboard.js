import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './index.css';
import { Modal } from './Modal';
import spinner from './spinner.gif';

function Dashboard(props) {

     // Destructure props
     const {roster, setRoster} = props;
     const {usedIds, setUsedIds} = props;
     const TOTAL_VILLAGERS = props.TOTAL_VILLAGERS;

    // State variables
    const [canidate, setCanidate] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
      canidateApproaches()
    }, [])
  
    // Function for generating a random villager id that isn't already in the roster
    const randomVillagerId = () => {
        // Generate random id number
        let min = Math.ceil(1);
        let max = Math.floor(TOTAL_VILLAGERS);
        let randomId =  Math.floor(Math.random() * (max - min + 1)) + min;  

        // Ensure villager isn't already in roster (id isn't already used)
        // Only 10 ids out of 391 can be used at a time 
        while (usedIds.includes(randomId)){
            min = Math.ceil(1);
            max = Math.floor(TOTAL_VILLAGERS);
            randomId =  Math.floor(Math.random() * (max - min + 1)) + min;  
        }

        return randomId;
    }
  
    // Helper function for getting the English name
    const clarifyName = (data) => {
        data.name = data.name["name-USen"]
    }
  
    // Function for getting the data for a randomly generated villager id
    const canidateApproaches = () => {
      axios.get("https://acnhapi.com/v1/villagers/" + randomVillagerId())
      .then(response => {
        clarifyName(response.data);
        setCanidate(response.data);
      })
    }
  
    // Function for adding current villager to the roster
    const recruitVillager = (villager) => {

      // Ensure roster is not full 
      if (roster.length < 10) {
        // Append current villager to state
        setRoster(state => {
          // Check if villager id is already in the roster
          const villagerExists = (state.filter(v => villager.id === v.id).length > 0);
        
          // If not in the roster, add current villager and sort by id
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
        // Load next canidate
        canidateApproaches();
      }
      // If roster already has 10 villagers, show modal
      else {
        setShowModal(true);
      }
    }
  
    // If villager is skipped, generate another random villager without adding the current villager to the roster
    const skipVillager = () => {
      canidateApproaches();
    }
  
    return (
        <section className='currentCanidate'>
          <h2>Island Visitor</h2>
          <div className="images">
            <img 
              src={canidate.image_uri} 
              className="profilePicDash"
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
            <button className='canidateButton' data-inline="true" onClick={() => recruitVillager(canidate)}>REGISTER</button>
          </div>
        </section>
    )
}

export { Dashboard };