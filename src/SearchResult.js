import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchResult(props) {

    const {result, setResult} = props;
    const [foundVillager, setFoundVillager] = useState([]);

    useEffect(() => {
        if (result.length > 0){
            axios.get("https://acnhapi.com/v1/villagers/" + result)
            .then(response => {
                const cleanData = clarifyName(response.data)
                // Have to keep in array format so I can use the .map function when rendering
                setFoundVillager([response.data]);
                
            })
        }
      }, [result])

    const clarifyName = (data) => {
        data.name = data.name["name-USen"]
    }

    return (
      <div>
          <h2>Results</h2>
          <div>
                {foundVillager.map(villager => (
                    <div className="resultVillager" key={villager.id}>
                        <Link to={`/villager/${villager.id}`} key={villager.id}>
                            <img src={villager.icon_uri} />
                            <h4>{villager.name}</h4>
                        </Link>
                    </div>
                ))}
          </div>
            
      </div>
    )
}


export {SearchResult};
