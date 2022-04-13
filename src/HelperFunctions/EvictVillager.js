// Function for removing villagers from roster (and usedIds array)
function EvictVillager(setRoster, setUsedIds, id) {
    // Return all villagers except the one being removed
    setUsedIds(state => state.filter(v => v != id));
    setRoster(state => state.filter(v => v.id != id));
}

export { EvictVillager };