import React, { Component } from 'react'

function PersonalityMatrix(props) {

    const HARMONY_MATRIX = {
        "Normal": ["Normal", "Lazy", "Jock", "Peppy", "Smug"],
        "Lazy": ["Normal", "Lazy", "Uchi", "Peppy", "Smug"],
        "Uchi": ["Lazy", "Jock", "Peppy", "Smug"],
        "Snooty": ["Cranky"],
        "Cranky": ["Snooty", "Jock"],
        "Jock": ["Normal", "Uchi", "Cranky", "Peppy"],
        "Peppy": ["Normal", "Lazy", "Uchi", "Jock", "Smug"],
        "Smug": ["Normal", "Lazy", "Uchi", "Peppy", "Smug"]
    }
    const CONFLICT_MATRIX = {
        "Normal": [],
        "Lazy": ["Jock"],
        "Uchi": ["Snooty", "Cranky"],
        "Snooty": ["Uchi", "Jock"],
        "Cranky": ["Uchi", "Peppy", "Smug"],
        "Jock": ["Lazy", "Snooty"],
        "Peppy": ["Cranky"],
        "Smug": ["Cranky"]
    }
    return (
      <div>Personality</div>
    )
}

export {PersonalityMatrix};
