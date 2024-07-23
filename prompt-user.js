// NPM Imports
import { input } from "@inquirer/prompts";
import { checkbox, Separator } from "@inquirer/prompts"; 

const getPokemonName = async () => {
    return await input({message: "Pokemon name:"}); 
}

const getOptions = async () => {
    return await checkbox({
        message: "Pokemon data to download:",
        choices: [
            new Separator("-- Options --"),
            {name: "Stats", value: "stats"},
            {name: "Sprites", value: "sprites"},
            {name: "Artwork", value: "artwork"}
        ],
        required: true       
    });
}

const getContinue = async () => {
    return await input({message: "Would you like to search for another Pokemon? "});
}

export { getPokemonName, getOptions, getContinue }; 

