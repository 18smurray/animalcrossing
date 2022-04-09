import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchResult(props) {

    const {result, setResult} = props;
    // Either inactive, pending, or active
    // Will be either inactive or pending when first received...
    const {resultStatus, setResultStatus} = props;
    const {isLoading, setIsLoading} = props;
    const [foundVillager, setFoundVillager] = useState([]);
    

    useEffect(() => {
        if (result.length > 0 && result[0] !== -1000){
            axios.get("https://acnhapi.com/v1/villagers/" + result)
            .then(response => {
                const cleanData = clarifyName(response.data)
                // Have to keep in array format so I can use the .map function when rendering
                setFoundVillager([response.data]);
            })
        }
        else if (result[0] === -1000) {
            setFoundVillager([-1000]);
        }
        else{
            setFoundVillager([]);
        }

      }, [result])

    const clarifyName = (data) => {
        data.name = data.name["name-USen"]
    }

    if (resultStatus === "inactive"){
        return <div>STATUS INACTIVE</div>
    }
    else if (resultStatus === "pending"){
        if (foundVillager.length > 0){
            return (
                <div className="searchResult">
                    {foundVillager[0] !== -1000 ? 
                        <div onLoad={() => setIsLoading(false)}>
                            {foundVillager.map(villager => (
                                <div className="resultVillager" key={villager.id}>
                                    <Link to={`/villager/${villager.id}`} key={villager.id}>
                                        <img src={villager.icon_uri} className="villagerIcon"/>
                                        <h5>{villager.name}</h5>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    :
                        <h4 onLoad={() => setIsLoading(false)} className="noResults">
                            NO RESULTS
                        </h4>
                    }
                </div>
            )
        }
    }
}


export {SearchResult};
