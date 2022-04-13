import React, { Component } from 'react'
import { useEffect, useState } from 'react';
import { SearchResult } from './SearchResult';
import spinner from './spinner.gif';

function SearchBar(props) {

    // Destructure props
    const {searchDict, setSearchDict} = props;

    // State variables
    const [searchName, setSearchName] = useState({name: ""});
    const [result, setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Sets searchName to whatever is in the search box
    const handleChange = (e) => {
        setSearchName({
            ...searchName,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim().toLowerCase()
        });
    };

    // Function for when user clicks submit
    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true);

        // Based on searchName (what's in the search box)
        // Get a list of names from the searchDict that match or partially match
        let nameList = Object.keys(searchDict).filter(k => k.includes(searchName.name));
        
        // Gets the ids for the villager names that matched the search name
        if (nameList.length > 0) {
            let keysToReturn = [];
            nameList.forEach(name => keysToReturn.push(searchDict[name]))
            //console.log(keysToReturn);
            setResult(keysToReturn);
        }
        // Use id -1000 to indicate that a search was performed but no matches were returned
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
           
           {/* 
                When matches have been found and isLoading is true, display the spinner gif
                When results render, isLoading is set to false
           */}
            {isLoading && result[0] !== -1000 ? 
                <img src={spinner} className="villagerIcon" />  
                : null      
            }

            <SearchResult result={result} setResult={setResult} isLoading={isLoading} setIsLoading={setIsLoading}/>
      </section>
    )
}

export {SearchBar};