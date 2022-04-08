import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default function Header () {
    return (
        <header className="appHeader">
            <Link to="/">
                <button className="searchButton">Home</button>
            </Link>
            <Link to="/search">
                <button className="searchButton">Search Villager</button>
            </Link>
            <div className="centerHead">
                <h1 className='title'>React Hooks</h1>
                <h3 className='subtitle'>With Animal Crossing</h3>
            </div>
        </header>
    )
}
