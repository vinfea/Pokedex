// NPM Imports
import fetch from "node-fetch"; 

const fetchPokemon = async (name) => {
    let url = "https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase() + "/";
    try {
        let response = await fetch(url); 
        let data = await response.json(); 
        return data;
    }
    catch {
        console.log("Error fetching data. Please confirm your network connection and input a valid pokemon name.");
        return -1; 
    }  
}

export { fetchPokemon }; 

