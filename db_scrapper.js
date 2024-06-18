const axios = require("axios");
const fs = require("fs");

const backendUrl = "https://api.artic.edu/api/v1/artworks/search?q=Impressionism&fields=id,title,image_id,description,short_description,date_start,date_end,artist_display,artist_title&limit=100&page=";

async function fetchArtworks() {
    try {
        let allArtworks = [];
        for (let i = 1; i <= 3; i++) {
            const response = await axios.get(backendUrl + i);
            const artworks = response.data.data;
            allArtworks = allArtworks.concat(artworks);
            console.log(`Fetched ${artworks.length} artworks from page ${i}`);
        }
        fs.writeFileSync("artwork.json", JSON.stringify(allArtworks, null, 2));
        console.log(`Fetched and saved a total of ${allArtworks.length} artworks`);
    } catch (error) {
        console.error("Error fetching artworks:", error);
    }
}

fetchArtworks();
