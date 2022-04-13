import { Link } from 'react-router-dom';

function PersonalityMatrix(props) {

    // Destructure props
    const {roster, currentVillager} = props;

    // Dictionary for referencing which personality types get along
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
    // Dictionary for referencing which personality types conflict
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

    // Given an array of personality types, return an array of
    // registered villagers that have one of those personality types
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

    // Return two arrays based on personality types
        //Registered villagers that get along with the current villager
        //Registered villagers that conflict with the current villager
    function buildLists() {
        // Get the corresponding harmony and conflict personality arrays based on current villager personality
        const currentPersonality = currentVillager.personality;
        const harmonyTypes = HARMONY_MATRIX[currentPersonality];
        const conflictTypes = CONFLICT_MATRIX[currentPersonality];
    
        // Get arrays of registered villagers that have one of the personality types from the appropriate list
        const harmonyVillagers = getVillagerArray(harmonyTypes);
        const conflictVillagers = getVillagerArray(conflictTypes);

        return [harmonyVillagers, conflictVillagers];
    }
    
    // Destructure the return from buildLists()
    const [harmonyVillagers, conflictVillagers] = buildLists();

    return (
      <div className='personalityDetails'> 
          <div className='listTitle'>LIKELY TO GET ALONG</div>
          <div className="personalityListWrapper">
            <div className='personalityList'>
                {harmonyVillagers.length > 0 ? 
                    harmonyVillagers.map(villager => (
                        <div key={villager.id}>
                            <Link to={`/villager/${villager.id}`} key={villager.id}>
                                <img src={villager.icon_uri} className="villagerIcon" />
                                {villager.name}
                            </Link>
                        </div>
                    ))
                :<div className="noPersonalityMatch">None</div>}
            </div>
          </div>
          <div className='listTitle'>LIKELY TO CONFLICT</div>
          <div className='personalityList'>
              {conflictVillagers.length > 0 ? 
              
                conflictVillagers.map(villager => (
                    <div key={villager.id}>
                        <Link to={`/villager/${villager.id}`} key={villager.id}>
                            <img src={villager.icon_uri} className="villagerIcon" />
                            {villager.name}
                        </Link>
                    </div>
                ))

                : <div className="noPersonalityMatch">None</div>}
            </div>
      </div>
    )
}

export { PersonalityMatrix };
