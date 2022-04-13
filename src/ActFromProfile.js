import { EvictVillager } from "./HelperFunctions/EvictVillager";

function ActFromProfile(props) {

    // Destructure props
    const {roster, setRoster} = props;
    const {usedIds, setUsedIds} = props;
    const currentVillager = props.currentVillager;

    // Function for adding a villager to the roster from the profile page
    const recruitVillager = (villager) => {
        // Append current villager to roster
        setRoster(state => {
            // Check to see if villager is already in the roster
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
    }

    // If villager is already in roster, have option to remove
    // If villager is not in roster AND the roster is not full, have option to add them
    // If roster is full, don't return any additional action buttons
    if(roster.some(e => e.id === currentVillager.id)) {
        return (
            <button className='canidateButton' onClick={() => EvictVillager(setRoster, setUsedIds, currentVillager.id)}>REMOVE</button>
          )
      }
    else if (roster.length < 10){
        return (
            <button className='canidateButton' onClick={() => recruitVillager(currentVillager)}>REGISTER</button>
          )
    }
    else {
        return (null)
    }
}

export {ActFromProfile}