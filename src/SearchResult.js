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

            // console.log("Calling getAPIData")
            // console.log(isLoading, result, foundVillager);
            //getAPIData();
            Promise.all(result.map(id => axios.get("https://acnhapi.com/v1/villagers/" + id)
            .then(response => {clarifyName(response.data); return response.data;}
            ))).then(response => {setFoundVillager(response)});

            // let villagerList = []
            // result.forEach(id => 
            //     axios.get("https://acnhapi.com/v1/villagers/" + id)
            //     .then(response => {
            //         const cleanData = clarifyName(response.data)
            //         // Have to keep in array format so I can use the .map function when rendering
            //         console.log(response.data)
            //         villagerList.push(response.data);
            //     })
            // )

            // setTimeout(() => {
            //     setFoundVillager(villagerList);
            //     console.log(foundVillager)
            // }, 2000)
        }
        else if (result[0] === -1000) {
            setFoundVillager([-1000]);
        }
        else{
            setFoundVillager([]);
        }

      }, [result])

    function getAPIData() {
        // Don't keep going without letting this finish
        const apiData = getMatchedVillagers();
        setFoundVillager(apiData);
    }

    // Must be an async function we're awaiting - synchronous won't return until it has results
    function getMatchedVillagers() {
        let villagerList = []
        

        Promise.all(result.map(id => axios.get("https://acnhapi.com/v1/villagers/" + id)
            .then(response => {clarifyName(response.data); return response.data;}
            ))).then(response => {villagerList = response})


        // result.forEach(id => 
        //     axios.get("https://acnhapi.com/v1/villagers/" + id)
        //     .then(response => {
        //         const cleanData = clarifyName(response.data)
        //         // Have to keep in array format so I can use the .map function when rendering
        //         // console.log(response.data)
        //         villagerList.push(response.data);
        //     })
        //)
        return villagerList;

        // Promise.all([URL_VOLUMES, URL_BOOKS].map(url =>
        //     fetch(url).then(response => response.json())
        // )).then(jsonResults => {
        //     if (mounted) {
        //         cacheBooks(jsonResults);
        //     }
        // });
    }

    const clarifyName = (data) => {
        data.name = data.name["name-USen"]
    }

    if (resultStatus === "inactive"){
        return 
    }
    else if (resultStatus === "pending"){
        if (foundVillager.length > 0){
            return (
                <div className="searchResult">
                    {foundVillager[0] !== -1000 ? 
                        <div className="searchGrid" onLoad={() => setIsLoading(false)}>
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
}


export {SearchResult};
