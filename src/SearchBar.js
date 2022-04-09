import React, { Component } from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchResult } from './SearchResult';
import spinner from './spinner.gif';

function SearchBar() {

    const [searchName, setSearchName] = useState({name: ""});
    const [searchInfoDict, setSearchInfoDict] = useState({});
    const [result, setResult] = useState([]);
    // Will either be inactive, pending, or active
    const [resultStatus, setResultStatus] = useState("inactive");
    const [isLoading, setIsLoading] = useState(false);
    
    let searchPairs = {};

    useEffect(() => {
        getSearchData()
      }, [])

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
        
        if (searchName.name in searchInfoDict){
            // Change what gets rendered in SearchResult
            setResult([searchInfoDict[searchName.name]]);
        }
        //else if - could try something with partial
        else {
            setResult([-1000]);
        }
    };

    const clarifyName = (data) => {
        data.name = data.name["name-USen"]
    }
  
    const getSearchData = () => {
        for (let i = 1; i <= 391; i++){
            axios.get("https://acnhapi.com/v1/villagers/" + i)
            .then(response => {
                clarifyName(response.data);
                searchPairs[(response.data.name).toLowerCase()] = response.data.id;
            })
        }
        setSearchInfoDict(searchPairs);
    }
    
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