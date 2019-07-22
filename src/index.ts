import { get } from "./http.service";
import { InquirerQ } from "./inquirer";
import { StarwarsModule, StarshipValue } from "./starwars.model";

getStarships().then(starshipsResponse => InquirerQ(starshipsResponse));

async function getStarships(): Promise<StarwarsModule<StarshipValue>[]> {
  let starshipUrl = `https://swapi.co/api/starships/`;
  let starshipDetails: StarwarsModule<StarshipValue>[] = [];

  while (starshipUrl != null) {
    const starshipsApi = await get(starshipUrl);

    for (let i = 0; i < starshipsApi.data.results.length; i++) {
      let starshipName: string = starshipsApi.data.results[i].name;
      let pilotUrls: string[] = starshipsApi.data.results[i].pilots;

      starshipDetails.push({
        name: starshipName,
        value: {
          name: starshipName,
          pilotUrls: pilotUrls
        }
      });
    }
    starshipUrl = starshipsApi.data.next;
  }

  return starshipDetails;
}
