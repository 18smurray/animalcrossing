import React, { Component } from 'react'
import { Link } from 'react-router-dom';

function PersonalityMatrix(props) {

    const {roster, setRoster} = props;
    const currentVillager = props.currentVillager;

    // TO DO - Don't include villager themself in list (normal)

    const HARMONY_MATRIX = {
        "Normal": ["Normal", "Lazy", "Jock", "Peppy", "Smug"],
        "Lazy": ["Normal", "Lazy", "Uchi", "Peppy", "Smug"],
        "Uchi": ["Lazy", "Jock", "Peppy", "Smug"],
        "Snooty": ["Cranky"],
        "Cranky": ["Snooty", "Jock"],
        "Jock": ["Normal", "Uchi", "Cranky", "Peppy"],
        "Peppy": ["Normal", "Lazy", "Uchi", "Jock", "Smug"],
        "Smug": ["Normal", "Lazy", "Uchi", "Peppy", "Smug"]
    }
    const CONFLICT_MATRIX = {
        "Normal": [],
        "Lazy": ["Jock"],
        "Uchi": ["Snooty", "Cranky"],
        "Snooty": ["Uchi", "Jock"],
        "Cranky": ["Uchi", "Peppy", "Smug"],
        "Jock": ["Lazy", "Snooty"],
        "Peppy": ["Cranky"],
        "Smug": ["Cranky"]
    }

    function getVillagerArray(personalityArray){
        let villagerArray = [];
        // React renders components BEFORE running code
        // Make sure components can render without content at least once
        if (personalityArray !== undefined){
            roster.forEach(villager => {
                if (personalityArray.includes(villager.personality)){
                    if (villager.id !== currentVillager.id) {
                        villagerArray.push(villager);
                    }
                }
            });
        }
        return villagerArray;
    }

    function buildLists() {
        const currentPersonality = currentVillager.personality;
        const harmonyTypes = HARMONY_MATRIX[currentPersonality];
        const conflictTypes = CONFLICT_MATRIX[currentPersonality];
    
        const harmonyVillagers = getVillagerArray(harmonyTypes);
        const conflictVillagers = getVillagerArray(conflictTypes);

        return [harmonyVillagers, conflictVillagers];
    }
    
    const [harmonyVillagers, conflictVillagers] = buildLists();

    return (
      <div className='personalityDetails'> 
          <div className='listTitle'>LIKELY TO GET ALONG</div>
          <div className="personalityListWrapper">
            <div className='personalityList'>
                {harmonyVillagers.map(villager => (
                    <div key={villager.id}>
                        <Link to={`/villager/${villager.id}`} key={villager.id}>
                            <img src={villager.icon_uri} className="villagerIcon" />
                            {villager.name}
                        </Link>
                    </div>
                ))}
            </div>
          </div>
          <div className='listTitle'>LIKELY TO CONFLICT</div>
          <div className='personalityList'>
                {conflictVillagers.map(villager => (
                    <div key={villager.id}>
                        <Link to={`/villager/${villager.id}`} key={villager.id}>
                            <img src={villager.icon_uri} className="villagerIcon" />
                            {villager.name}
                        </Link>
                    </div>
                ))}
            </div>
      </div>
    )
}

export { PersonalityMatrix };
