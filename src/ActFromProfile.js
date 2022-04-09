import React, { Component } from 'react'

function ActFromProfile(props) {

    const {roster, setRoster} = props;
    const {usedIds, setUsedIds} = props;
    const currentVillager = props.currentVillager;

    const evictVillager = id => {
        setUsedIds(state => state.filter(v => v != id));
        // Return all villagers except the one being removed
        setRoster(state => state.filter(v => v.id != id));
        // Remove id from the usedIds list
    }

    const recruitVillager = (villager) => {
        // Append instead of erase state
        setRoster(state => {
            const villagerExists = (state.filter(v => villager.id == v.id).length > 0);
        
            if (!villagerExists) {
                state = [...state, villager]
                state.sort(function (a, b) {
                    return a.id - b.id
                })
            }
            return state
        });
        setUsedIds([...usedIds, villager.id]);
    }

    // If villager is already in roster, have option to remove
    // If villager is not in roster AND the roster is not full, have option to add them
    if(roster.some(e => e.id == currentVillager.id)) {
        return (
            <button className='canidateButton' onClick={() => evictVillager(currentVillager.id)}>REMOVE FROM ROSTER</button>
          )
      }
    else if (roster.length < 10){
        return (
            <button className='canidateButton' onClick={() => recruitVillager(currentVillager)}>ADD TO ROSTER</button>
          )
    }
    else {
        return (null)
    }

    // if (roster.includes(currentVillager)){
    //     console.log("INCLUDED");
    // }
    // else{
    //     console.log("NOT INCLUDED")
    // }

}

export {ActFromProfile}