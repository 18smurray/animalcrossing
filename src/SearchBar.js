import React, { Component } from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchResult } from './SearchResult';
import spinner from './spinner.gif';

function SearchBar(props) {

    const [searchName, setSearchName] = useState({name: ""});
    const [result, setResult] = useState([]);
    // Will either be inactive, pending, or active
    const [resultStatus, setResultStatus] = useState("inactive");
    const [isLoading, setIsLoading] = useState(false);
    const {searchDict, setSearchDict} = props;

    const handleChange = (e) => {
        setSearchName({
            ...searchName,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim().toLowerCase()
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(searchName.name);
        // console.log("HANDLE SUBMIT", searchInfoDict)

        // Change resultStatus to pending
        setResultStatus("pending");
        setIsLoading(true);
        
        if (searchName.name in searchDict){
            // Change what gets rendered in SearchResult
            //searchDict.filter((n) => n)
            //iterate over keys and return keys that match... (using filter)
            //Object.keys(searchDict).filter(k => k.includes(searchName.name))
            setResult([searchDict[searchName.name]]);
        }
        //else if - could try something with partial
        else {
            setResult([-1000]);
        }
    };
    
    return (
        <section className='currentCanidate'>
            <h2>Search Villagers</h2>
            
            <label for="searchInput" className="searchPrompt">Enter Villager Name</label><br />
            <input type="text" id="searchInput" name="name" onChange={handleChange} /><br />
            <button className="canidateButton" onClick={handleSubmit}>Search</button><br />
           
            {isLoading && result[0] !== -1000 ? 
                <img src={spinner} className="villagerIcon" />  
                : null      
            }
            <SearchResult result={result} setResult={setResult} resultStatus={resultStatus} setResultStatus={setResultStatus} isLoading={isLoading} setIsLoading={setIsLoading}/>
            
      </section>
    )
}

export {SearchBar};