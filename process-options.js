// Custom Imports
import { makeFolder, writeStats, createSprites, createArtwork } from "./write.js";

const processOptions = async (pokemonName, pokemonData, options) => {
    await makeFolder(pokemonName); 

    if (options.includes("stats")) {
        let { stats: statsData} = pokemonData;
        await writeStats(pokemonName, statsData); 
    }

    if (options.includes("sprites")) {
        let {sprites: spritesData} = pokemonData;
        await createSprites(pokemonName, spritesData); 
    }

    if (options.includes("artwork")) {
        let { sprites: { other: {"official-artwork": artworkData} } } = pokemonData; 
        await createArtwork(pokemonName, artworkData); 
    }
}

export { processOptions };