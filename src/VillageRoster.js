import {Link} from 'react-router-dom';

function VillageRoster(props) {

    // Destructure props
    const {roster, setRoster} = props;
    const {usedIds, setUsedIds} = props;

    // Function for removing a villager from the roster
    const evictVillager = id => {
      // Return all villagers except the one being removed
      setUsedIds(state => state.filter(v => v != id));
      setRoster(state => state.filter(v => v.id != id));
    }

    return (
      <section className='villagerRoster'>
          <h2>Villager Roster</h2>
          <div className='villagerList'>
            {/* For each villager in the roster, create an info card with a button to remove and to get more info */}
            {roster.map(villager => {
                <div className="villager" key={villager.id}>
                    <img src={villager.image_uri} className="profilePic"></img>
                    <h3 className='villagerName'>{villager.name}</h3>
                    <Link to={`villager/${villager.id}`} key={villager.id}>
                        <button className='moreInfo' onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'}), document.activeElement.blur()}}>INFO</button>
                    </Link>
                    <button className='remove' onClick={() => evictVillager(villager.id)}>&times;</button>
                </div>
            })}
          </div>
        </section> 
    )
}

export { VillageRoster };
