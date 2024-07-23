// Custom Imports
import { fetchPokemon } from "./fetch.js"; 
import { getPokemonName, getOptions, getContinue } from "./prompt-user.js";
import { processOptions } from "./process-options.js"; 

// Main Program
const main = async () => {

    while (true) {
        // User prompting and fetching phase
        let pokemonName = await getPokemonName();
        let pokemonData = await fetchPokemon(pokemonName);
        let options = await getOptions();

        // Processing phase
        await processOptions(pokemonName, pokemonData, options); 

        // Continue? phase
        let active = await getContinue();
        if (active.toLocaleLowerCase() == "no") {
            break; 
        }
    }

}

export { main };

