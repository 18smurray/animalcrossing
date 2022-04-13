import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchResult(props) {

    // Destructure props
    const {result, setResult} = props;
    // Either inactive or pending
    const {isLoading, setIsLoading} = props;

    // State variable
    const [foundVillagers, setfoundVillagers] = useState([]);

    // When component renders and when the dependency (result - what is submitted in the search bar) changes
    useEffect(() => {
        // If a search has been performed and there was a match (id -1000 indicates no matches)
        if (result.length > 0 && result[0] !== -1000){

            // For each id in the result array, get the villager data
            // Wait for all promises to resolve before setting the state variable
            Promise.all(result.map(id => axios.get("https://acnhapi.com/v1/villagers/" + id)
            .then(response => {clarifyName(response.data); return response.data;}
            ))).then(response => {setfoundVillagers(response)});

        }
        // If a search was performed but no matches were found
        else if (result[0] === -1000) {
            setfoundVillagers([-1000]);
        }
        // If no search has been performed yet
        else{
            setfoundVillagers([]);
        }
      }, [result])

    // Helper function for getting the English name
    const clarifyName = (data) => {
        data.name = data.name["name-USen"]
    }

    // If no search has been performed, don't return anything
    if (foundVillagers.length === 0){
        return 
    }
    // If search has been performed, return results
    else {
        return (
            <div className="searchResult">
                {foundVillagers[0] !== -1000 ? 
                    <div className="searchGrid" onLoad={() => setIsLoading(false)}>
                        {foundVillagers.map(villager => (
                            <div className="resultVillager" key={villager.id}>
                                <Link to={`/villager/${villager.id}`} key={villager.id}>
                                    <img src={villager.icon_uri} className="villagerIcon"/>
                                    <h5>{villager.name}</h5>
                                </Link>
                            </div>
                        ))}
                    </div>
                :
                    <div className="noResults">
                        <h4 onLoad={() => setIsLoading(false)}>
                            NO RESULTS
                        </h4>
                        <h5>(Only exact matches will be returned)</h5>
                    </div>
                }
            </div>
        )
    }
}


export {SearchResult};
