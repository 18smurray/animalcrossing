import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PersonalityMatrix } from './Personality';

function VillagerInfo(props) {
    
    const [villager, setVillager] = useState([]);
    const {roster, setRoster} = props;
    
    const params = useParams();
    const villagerId = params.villagerIndex;

    useEffect(() => {
        getVillagerInfo()
      }, [params])
      // Had villager as dependency - leads to endless requests...
      // Switch to params - indicates a change in the hash :)

    const clarifyName = (data) => {
        data.name = data.name["name-USen"]
    }
  
    const getVillagerInfo = () => {
      axios.get("https://acnhapi.com/v1/villagers/" + villagerId)
      .then(response => {
        const cleanData = clarifyName(response.data)
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
                    <img src={villager.image_uri} className="detailsPic"></img>
                    <div className='canidateDetails'>
                        
                        <div className='listTitle'>DETAILS</div>
                        Species: {villager.species}<br/>
                        Gender: {villager.gender} <br/>
                        Birthday: {villager["birthday-string"]} <br/>
                        Personality: {villager.personality} <br/>
                        Catch Phrase: "{villager["catch-phrase"]}"<br/>
                    </div>
                    <PersonalityMatrix roster={roster} setRoster={setRoster} currentVillager={villager}/>
                   
                </div>
                <Link to="/">
                    <button className='canidateButton'>BACK TO BROWSING</button>
                </Link>
                
         
            </section>
        </section>
    )
}

export {VillagerInfo};