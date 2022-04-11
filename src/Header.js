import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default function Header () {
    return (
        <header className="appHeader">
            <Link to="/">
                <button className="searchButton" onClick={() => document.activeElement.blur()}>HOME</button>
            </Link>
            <Link to="/search">
                {/* remove focus when clicked */}
                <button className="searchButton" onClick={() => document.activeElement.blur()}>SEARCH</button>
            </Link>
            <div className="centerHead">
                <h1 className='title'>ANIMAL CROSSING VILLAGER EXPLORER</h1>
                <h3 className='subtitle'>SHANNON MURRAY IS542 SEMESTER PROJECT</h3>
            </div>
        </header>
    )
}

