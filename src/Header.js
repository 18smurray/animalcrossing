import { Link } from 'react-router-dom'

// Header to be loaded at the top - includes navbar button navigation links
export default function Header () {
    return (
        <header className="appHeader">
            {/* remove focus when clicked - document.activeElement.blur() */}
            <Link to="/">
                <button className="searchButton" onClick={() => document.activeElement.blur()}>HOME</button>
            </Link>
            <Link to="/search">
                <button className="searchButton" onClick={() => document.activeElement.blur()}>SEARCH</button>
            </Link>
            <div className="centerHead">
                <h1 className='title'>ANIMAL CROSSING VILLAGER EXPLORER</h1>
                <h3 className='subtitle'>SHANNON MURRAY IS542 SEMESTER PROJECT</h3>
            </div>
        </header>
    )
}

