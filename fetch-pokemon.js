async function fetchPokemon(name) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase() + "/";
    let response = await fetch(url); 
    let data = await response.json(); 
    return data; 
}

export { fetchPokemon }; 

