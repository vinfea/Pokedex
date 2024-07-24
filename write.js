// NPM Imports
import fs from "fs/promises";
import path from "path"; 

const makeFolder = async (folderName) => {
    let filepath = path.join(process.cwd(), folderName); 

    try {
        await fs.access(filepath);
    } 
    catch {
        // Folder does not exist; create a new one
        try {
            await fs.mkdir(filepath)
        }
        catch {
            console.log("Error creating folder"); 
        }
    }
}

const writeStats = async (pokemonName, statsData) => {
    let filepath = path.join(process.cwd(), pokemonName, "stats.txt"); 

    // Process data first
    let hp = statsData[0].base_stat;
    let atk = statsData[1].base_stat;
    let def = statsData[2].base_stat;
    let sp_atk = statsData[3].base_stat;
    let sp_def = statsData[4].base_stat;
    let spe = statsData[5].base_stat;
    
    let bst = hp + atk + def + sp_atk + sp_def + spe; 

    let stringToWrite = "HP: " + hp +
                        "\nAttack: " + atk + 
                        "\nDefense: " + def +
                        "\nSp. Attack: " + sp_atk +
                        "\nSp. Defense: " + sp_def + 
                        "\nSpeed: " + spe +
                        "\nTotal: " + bst; 

    try {
        fs.writeFile(filepath, stringToWrite);
        console.log("Saved: stats.txt"); 
    }
    catch {
        console.log("Error writing to the file stats.txt"); 
    }
}

const createSprites = async (pokemonName, spritesData) => {
    let spritePromises = [];
    let filenames = [];
    for (let [key, value] of Object.entries(spritesData)) {
        if (typeof value == "string") {
            // Value is the URL of the image to fetch
            try {
                spritePromises.push(fetch(value).then((res) => res.arrayBuffer())); 
                filenames.push(key); 
            }
            catch {
                console.log("Error fetching sprites."); 
            }   
        }
    }

    spritePromises = await Promise.all(spritePromises); 

    for (let i = 0; i < spritePromises.length; i++) {
        try {
            let filepath = path.join(process.cwd(), pokemonName, filenames[i] + ".png"); 
            await fs.writeFile(filepath, Buffer.from(spritePromises[i]));
            console.log("Saved: " + filepath);   
        }
        catch (error) {
            console.log("Error writing sprites."); 
        }
    }
}

const createArtwork = async (pokemonName, artworkData) => {
    for (let [key, value] of Object.entries(artworkData)) {
        if (typeof value == "string") {
            try {
                // Value is the URL of the image to fetch
                let response = await fetch(value);
                let arrayBuffer = await response.arrayBuffer();
                let filepath = path.join(process.cwd(), pokemonName, "official_artwork_" + key + ".png"); 
                await fs.writeFile(filepath, Buffer.from(arrayBuffer));
                console.log("Saved: " + filepath); 
            }
            catch {
                console.log("Error copying official artwork."); 
            }
        }
    }
}

export { makeFolder, writeStats, createSprites, createArtwork }; 