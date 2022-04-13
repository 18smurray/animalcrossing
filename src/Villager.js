import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PersonalityMatrix } from './Personality';
import { ActFromProfile } from './ActFromProfile';
import { ClarifyName } from './HelperFunctions/ClarifyName';

function VillagerInfo(props) {
    
    // Destructure props
    const {roster, setRoster} = props;
    const {usedIds, setUsedIds} = props;

    // State variable
    const [villager, setVillager] = useState([]);
    
    // Get villager id parameter passed in the url using useParams()
    const params = useParams();
    const villagerId = params.villagerIndex;

    useEffect(() => {
        getVillagerInfo()
    // Dependency on params - rerender when id in the hash changes
    }, [params])
  
    // Using the villagerId passed in the url, get the corresponding villager information
    const getVillagerInfo = () => {
      axios.get("https://acnhapi.com/v1/villagers/" + villagerId)
      .then(response => {
        ClarifyName(response.data);
        setVillager(response.data);
      })
    }

    return (
        <section>
            <section className='currentCanidate'>
                <h2>Villager Information</h2>
                <div className="nameAndIcon">
                    <img src={villager.icon_uri} className="villagerIcon"/> 
                    <h3 className='canidateName'>{villager.name}</h3>
                </div>
                <div className='villagerContent'>
                    <div className='profilePicDiv'>
                        <img src={villager.image_uri} className="detailsPic"></img>
                    </div>
                    <div className='canidateDetails'>
                        
                        <div className='summaryTitle'>SUMMARY</div>
                        Species: {villager.species}<br/>
                        Gender: {villager.gender} <br/>
                        Birthday: {villager["birthday-string"]} <br/>
                        Personality: {villager.personality} <br/>
                        Hobby: {villager.hobby} <br />
                        Catch Phrase: "{villager["catch-phrase"]}"<br/>
                        Saying: "{villager.saying}" <br /> 
                    </div>
                    <PersonalityMatrix roster={roster} currentVillager={villager}/>
                   
                </div>
                <Link to="/">
                    <button className='canidateButton'>HOME</button>
                </Link>
                <ActFromProfile roster={roster} setRoster={setRoster} currentVillager={villager} usedIds={usedIds} setUsedIds={setUsedIds}/>
            </section>
        </section>
    )
}

export {VillagerInfo};