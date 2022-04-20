import { Link } from "react-router-dom";

function BrowseResults(props) {

    const {speciesSearchDict, selectedSpecies, personalitySearchDict, selectedPersonality} = props;

    function matchBothFilters() {

    }
    
    if (speciesSearchDict !== undefined && personalitySearchDict !== undefined) {
        if (selectedSpecies !== undefined && selectedSpecies !== "N/A" &&
            selectedPersonality !== undefined && selectedPersonality !== "N/A") {
                console.log("DOUBLE MATCH");
                return (
                    <div className="searchGrid">
                        {speciesSearchDict[selectedSpecies].map(villager => (
                            villager.personality === selectedPersonality ? 
                                <div className="resultVillager" key={villager.id}>
                                    <Link to={`/villager/${villager.id}`} key={villager.id}>
                                        <img src={villager.icon_uri} className="villagerIcon"/>
                                        <h5>{villager.name}</h5>
                                    </Link>
                                </div>
                             : null
                        ))}
                    </div>
                )
        }
        
        if (selectedSpecies !== undefined && selectedSpecies !== "N/A") {
            return (
                <div className="searchGrid">
                    {speciesSearchDict[selectedSpecies].map(villager => (
                        <div className="resultVillager" key={villager.id}>
                            <Link to={`/villager/${villager.id}`} key={villager.id}>
                                <img src={villager.icon_uri} className="villagerIcon"/>
                                <h5>{villager.name}</h5>
                            </Link>
                        </div>
                    ))}
                </div>
            )
        }
        else if (selectedPersonality !== undefined && selectedPersonality !== "N/A") {
            return (
                <div className="searchGrid">
                    {personalitySearchDict[selectedPersonality].map(villager => (
                        <div className="resultVillager" key={villager.id}>
                            <Link to={`/villager/${villager.id}`} key={villager.id}>
                                <img src={villager.icon_uri} className="villagerIcon"/>
                                <h5>{villager.name}</h5>
                            </Link>
                        </div>
                    ))}
                </div>
            )
        }
    } 
}

export { BrowseResults };
