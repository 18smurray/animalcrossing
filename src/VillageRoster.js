import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

function VillageRoster(props) {

    const {roster, setRoster} = props;
    const {usedIds, setUsedIds} = props;

    const evictVillager = id => {
      setUsedIds(state => state.filter(v => v != id));
      // Return all villagers except the one being removed
      setRoster(state => state.filter(v => v.id != id));
      // Remove id from the usedIds list
    }

    return (
      <section className='villagerRoster'>
          <h2>Villager Roster</h2>
          <div className='villagerList'>
            {roster.map(villager => (
                <div className="villager" key={villager.id}>
                    <img src={villager.image_uri} className="profilePic"></img>
                    <h3 className='villagerName'>{villager.name}</h3>
                    <Link to={`villager/${villager.id}`} key={villager.id}>
                        <button className='moreInfo'>INFO</button>
                    </Link>
                    <button className='remove' onClick={() => evictVillager(villager.id)}>&times;</button>
                </div>
            ))}
          </div>
        </section> 
    )
}

export { VillageRoster };
