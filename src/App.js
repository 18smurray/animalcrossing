import React, {useState, useEffect} from 'react';
import {Dashboard} from './Dashboard.js';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import {VillagerInfo} from './Villager.js';
import Header from './Header.js';
import {VillageRoster} from './VillageRoster.js';
import { SearchBar } from './SearchBar.js';
import axios from 'axios';

function App() {
    const [roster, setRoster] = useState([]);
    const [usedIds, setUsedIds] = useState([]); 
    const [searchDict, setSearchDict] = useState();

    
    useEffect(() => {
        getdata()
      }, [])

    async function getdata() {
        const data = await getSearchData();
        setSearchDict(data);
    }
    

    const clarifyName = (data) => {
        data.name = data.name["name-USen"]
    }
  
    const getSearchData = () => {
        let searchPairs = {};
        for (let i = 1; i <= 391; i++){
            axios.get("https://acnhapi.com/v1/villagers/" + i)
            .then(response => {
                clarifyName(response.data);
                searchPairs[(response.data.name).toLowerCase()] = response.data.id;
            })
        }
        return searchPairs;
    }

    return (
        <Router>
            <div className='App'>
                <Header></Header>
                <Routes>
                    <Route path="/" element={<Dashboard roster={roster} setRoster={setRoster} usedIds={usedIds} setUsedIds={setUsedIds}/>} />
                    <Route path="/villager/:villagerIndex" element={<VillagerInfo roster={roster} setRoster={setRoster} usedIds={usedIds} setUsedIds={setUsedIds} />} />
                    <Route path="/search" element={<SearchBar searchDict={searchDict} setSearchDict={setSearchDict}/> } />
                </Routes>
                <VillageRoster roster={roster} setRoster={setRoster} usedIds={usedIds} setUsedIds={setUsedIds}/>
            </div>
        </Router>
    )
}

export { App };