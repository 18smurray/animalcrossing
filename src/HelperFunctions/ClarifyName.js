// Helper function for getting the English name of a specified villager
function ClarifyName(data) {
    // Return all villagers except the one being removed
    data.name = data.name["name-USen"];
}

export { ClarifyName };
