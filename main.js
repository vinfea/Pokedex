// NPM Imports
import { input } from "@inquirer/prompts";
import { checkbox, Separator } from "@inquirer/prompts"; 

// Custom Imports
import { fetchPokemon } from "./fetch-pokemon.js"; 

// Main Program
async function main() {

    while(true) {
        let name = await input({message: "Pokemon name:"});
        let pokemonData = await fetchPokemon(name);
        console.log(pokemonData); 
        
        let options = await checkbox({
            message: "Pokemon data to download:",
            choices: [
                new Separator("-- Options --"),
                {name: "Stats", value: "stats"},
                {name: "Sprites", value: "sprites"},
                {name: "Artwork", value: "artwork"}
            ],
            required: true       
        });

        let stats = []; 
        if (options.includes("stats")) {
            console.log("-------------- STATS --------------")
            let { stats: [
                { base_stat: hp },
                { base_stat: atk },
                { base_stat: def },
                { base_stat: sp_atk },
                { base_stat: sp_def },
                { base_stat: spe }
            ]}  = pokemonData; 
            
            stats.push(hp);
            stats.push(atk);
            stats.push(def);
            stats.push(sp_atk);
            stats.push(sp_def);
            stats.push(spe);
        }

        console.log(stats); 

        let sprites = {};      
        if (options.includes("sprites")) {
            
        }
        console.log(sprites); 

        if (options.includes("artwork")) {
            let { sprites: { other: {"official-artwork": artwork } } } = pokemonData; 
            console.log(artwork); 
        }
        
        let active = await input({message: "Would you like to search for another Pokemon? "})
        if (active.toLowerCase() == "no") {
            console.log("Breaking");
            break; 
        }
    }

}

main(); 

