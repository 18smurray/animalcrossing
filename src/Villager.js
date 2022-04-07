import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PersonalityMatrix } from './Personality';

export default function VillagerInfo(props) {
    
    const [villager, setVillager] = useState([]);
    
    const params = useParams();
    const villagerId = params.villagerIndex;

    useEffect(() => {
        getVillagerInfo()
      }, [villager])
      // Have to have villager as dependency so that the page rerenders when target villager changes
      // Solves being on details page and switching to another from the roster

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
                    <img src={villager.image_uri} className="profilePic"></img>
                    <div className='canidateDetails'>
                        Species: {villager.species}<br/>
                        Gender: {villager.gender} <br/>
                        Birthday: {villager["birthday-string"]} <br/>
                        Personality: {villager.personality} <br/>
                        Catch Phrase: "{villager["catch-phrase"]}"<br/>
                    </div>
                    <PersonalityMatrix/>
                </div>
                <Link to="/">
                    <button className='canidateButton'>BACK TO BROWSING</button>
                </Link>
         
            </section>
        </section>
    )
}
