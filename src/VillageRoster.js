import {Link} from 'react-router-dom';
import { EvictVillager } from './HelperFunctions/EvictVillager';

function VillageRoster(props) {

    // Destructure props
    const {roster, setRoster, setUsedIds} = props;

    return (
      <section className='villagerRoster'>
          <h2>Villager Roster</h2>
          <div className='villagerList'>
            {/* For each villager in the roster, create an info card with a button to remove and to get more info */}
            {roster.map(villager => (
                <div className="villager" key={villager.id}>
                    <img src={villager.image_uri} className="profilePic"></img>
                    <h3 className='villagerName'>{villager.name}</h3>
                    <Link to={`villager/${villager.id}`} key={villager.id}>
                        <button className='moreInfo' onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'}); document.activeElement.blur()}}>INFO</button>
                    </Link>
                    <button className='remove' onClick={() => EvictVillager(setRoster, setUsedIds, villager.id)}>&times;</button>
                </div>
            ))}
          </div>
        </section> 
    )
}

export { VillageRoster };
