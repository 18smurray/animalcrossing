import React, {useState, useEffect} from 'react';
import {Dashboard} from './Dashboard.js';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import {VillagerInfo} from './Villager.js';
import Header from './Header.js';
import {VillageRoster} from './VillageRoster.js';

function App() {
    const [roster, setRoster] = useState([]);
    const [usedIds, setUsedIds] = useState([]);

    return (
        <Router>
            <div className='App'>
                <Header></Header>
                <Routes>
                    <Route path="/" element={<Dashboard roster={roster} setRoster={setRoster} usedIds={usedIds} setUsedIds={setUsedIds}/>} />
                    <Route path="/villager/:villagerIndex" element={<VillagerInfo roster={roster} setRoster={setRoster} />} />
                </Routes>
                <VillageRoster roster={roster} setRoster={setRoster} usedIds={usedIds} setUsedIds={setUsedIds}/>
            </div>
        </Router>
    )
}

export { App };