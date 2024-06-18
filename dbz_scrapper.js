let backendUrl =
  "https://api.artic.edu/api/v1/artworks/search?q=Impressionism&fields=id,title,image_id&limit=100&page=";
const otherURL = "https://api.artic.edu/api/v1/artworks/";
const axios = require("axios");
const fs = require("fs");
const characters = [];
const arts = JSON.parse(fs.readFileSync("char.json", "utf8"));
// console.log(arts);

async function fetchCharacters() {
  try {
    // if (!backendUrl) {
    // 	return
    // }

    for (const art of arts) {
      //   console.log(art);
      const response = await axios.get(otherURL + art.id);
      // console.log(response)
      characters.push(response.data.data);
      console.log(`Fetched ${response.data.data.title}`);
      await sleep(100);
    }
    fs.writeFileSync(
      "enhanced_art_infos.json",
      JSON.stringify(characters, null, 2)
    );
  } catch (error) {
    console.log(error);
  }
}

async function sleep(time) {
  return new Promise((accept) => {
    setTimeout(() => {
      accept();
    }, time);
  });
}

fetchCharacters();
