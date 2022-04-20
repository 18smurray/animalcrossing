import { useEffect, useState } from "react";
import { BrowseResults } from "./BrowseResults";

function Browse(props) {

    const { speciesSearchDict, personalitySearchDict } = props;
    const [availableSpecies, setAvailableSpecies] = useState();
    const [selectedSpecies, setSelectedSpecies] = useState();
    const [availablePersonalities, setAvailablePersonalities] = useState();
    const [selectedPersonality, setSelectedPersonality] = useState();

    useEffect(() => {
        setAvailableSpecies(Object.keys(speciesSearchDict));
        setAvailablePersonalities(Object.keys(personalitySearchDict));
      }, [])

    // Handle selection
    const handleSpeciesChange = (e) => {
        setSelectedSpecies(e.target.value);
    };
    const handlePersonalityChange = (e) => {
        setSelectedPersonality(e.target.value);
    };

    if (speciesSearchDict !== undefined && availableSpecies !== undefined) {
        return (
            <section className='currentCanidate'>
            <h2>Browse Villagers</h2>

                <label for="selectSpecies" className="searchPrompt">
                    Filter By Species
                </label><br />
                <select name="selectSpecies" id="selectSpecies" onChange={handleSpeciesChange}>
                    <option key="N/A" value="N/A"></option>
                    {availableSpecies.map(species => (
                        <option key={species} value={species}>{species}</option>
                    ))}
                </select>

                <br />

                <label for="selectPersonality" className="searchPrompt">
                    Filter By Personality Type
                </label><br />
                <select name="selectPersonality" id="selectPersonality" onChange={handlePersonalityChange}>
                    <option key="N/A" value="N/A"></option>
                    {availablePersonalities.map(personality => (
                        <option key={personality} value={personality}>{personality}</option>
                    ))}
                </select>

                < BrowseResults 
                    speciesSearchDict={speciesSearchDict} 
                    selectedSpecies={selectedSpecies} 
                    personalitySearchDict={personalitySearchDict} 
                    selectedPersonality={selectedPersonality} 
                />
        
            </section>
        )
    }
}

export { Browse };

