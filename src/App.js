import React, {useState, useEffect} from 'react';
import {Dashboard} from './Dashboard.js';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import {VillagerInfo} from './Villager.js';
import Header from './Header.js';
import {VillageRoster} from './VillageRoster.js';
import { SearchBar } from './SearchBar.js';
import axios from 'axios';

function App() {
    // State variables
    const [roster, setRoster] = useState([]);
    const [usedIds, setUsedIds] = useState([]); 
    const [searchDict, setSearchDict] = useState();

    // Constant for number of villagers
    const TOTAL_VILLAGERS = 391;

    useEffect(() => {
        getdata()
      }, [])

    // Async functions run in the background; will await results of getSearchData before setting state
    async function getdata() {
        const data = await getSearchData();
        setSearchDict(data);
    }
    
    // Helper function for getting the English name 
    const clarifyName = (data) => {
        data.name = data.name["name-USen"]
    }
  
    // Function for generating a name:id dictionary for all villagers
    // To be used by the SearchBar component when matching names to ids
    const getSearchData = () => {
        let searchPairs = {};
        // For all villagers (391) add name:id to the dictionary
        for (let i = 1; i <= TOTAL_VILLAGERS; i++){
            axios.get("https://acnhapi.com/v1/villagers/" + i)
            .then(response => {
                clarifyName(response.data);
                searchPairs[(response.data.name).toLowerCase()] = response.data.id;
            })
        }
        return searchPairs;
    }

    // Return Header and VillageRoster - change middle component based on route
    return (
        <Router>
            <div className='App'>
                <Header></Header>
                <Routes>
                    <Route path="/" element={<Dashboard roster={roster} setRoster={setRoster} usedIds={usedIds} setUsedIds={setUsedIds} TOTAL_VILLAGERS={TOTAL_VILLAGERS}/>} />
                    <Route path="/villager/:villagerIndex" element={<VillagerInfo roster={roster} setRoster={setRoster} setUsedIds={setUsedIds} />} />
                    <Route path="/search" element={<SearchBar searchDict={searchDict} setSearchDict={setSearchDict}/> } />
                </Routes>
                <VillageRoster roster={roster} setRoster={setRoster} usedIds={usedIds} setUsedIds={setUsedIds}/>
            </div>
        </Router>
    )
}

export { App };